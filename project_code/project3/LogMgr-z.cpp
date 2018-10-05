#include "LogMgr.h"
#include <vector>
#include <queue>
#include <sstream>
#include "../StorageEngine/StorageEngine.h"

#include <iostream>


using namespace std;


  /*zh
   * Find the LSN of the most recent log record for this TX.
   * If there is no previous log record for this TX, return 
   * the null LSN.
   */
  int LogMgr::getLastLSN(int txnum){
   int tx_num = tx_table.count(txnum);
   if(tx_num == 0)
   {
    return NULL_LSN;
   }
   else
   {
    return tx_table[txnum].lastLSN;
   }
    }

  /*
   * Update the TX table to reflect the LSN of the most recent
   * log entry for this transaction.
   */
  void LogMgr::setLastLSN(int txnum, int lsn){
      //tx_table[txnum].lastLSN = lsn;
    if(tx_table.find(txnum)==tx_table.end()){
      txTableEntry txx(lsn,U);
      tx_table[txnum] = txx;
    }else{
      tx_table[txnum].lastLSN = lsn;
    }
  }

  /*mu
   * Force log records up to and including the one with the
   * maxLSN to disk. Don't forget to remove them from the
   * logtail once they're written!
   */
  void LogMgr::flushLogTail(int maxLSN){
   /* if(!logtail.empty()){
     
     for(vector <LogRecord*> ::iterator it =logtail.begin(); it != logtail.end(); it++)
     {
      //LogRecord* temp = *it
      if((*it)->getLSN() <= maxLSN)
      {
        se->updateLog((*it)->toString());
        auto prev_it = it - 1;
        logtail.erase(it);
        it = prev_it;
      }
     }
   }*/


   auto it = logtail.begin();
   while(it != logtail.end()){
    if((*it)->getLSN() <= maxLSN){
      se->updateLog((*it)->toString());
      logtail.erase(it);
    }else{
      it++;
    }
   }
   return;
}


  /* 
   * Run the analysis phase of ARIES.
   */
  void LogMgr::analyze(vector <LogRecord*> log){
    //find the most recent begin_ckpt;
    int master_lsn = se->get_master();
    //cout << "master = " << master_lsn << endl;
    int count_ckpt = 0;
    int count_compare = 0;
    vector <LogRecord*> ::iterator itt =log.begin();

    //clean tx_table dirty_page_table and logtail because of the crash
    tx_table.clear();
    dirty_page_table.clear();
    logtail.clear();


    if(log.size() == 0)
    {return;} 
    

    //find location of the ckpt;
    if(master_lsn != NULL_LSN){
        for(itt =log.begin(); itt != log.end(); itt++)
        {
          
          if((*itt)->getLSN() == master_lsn && (*itt)->getType() == BEGIN_CKPT)
          {
            count_ckpt = count_compare;
            break;
          }

            count_compare = count_compare + 1;
        }

        ChkptLogRecord* end_ckpt = dynamic_cast<ChkptLogRecord*>(*(itt+1));
        tx_table = end_ckpt->getTxTable();
        dirty_page_table = end_ckpt->getDirtyPageTable(); 
    }else{
      count_ckpt = 0;
    }


    


    for(int i = count_ckpt;i < log.size();i++)
    {
      if(log[i]->getType() == END)
      {
       tx_table.erase(log[i]->getTxID()); 

      }

      if(log[i]->getType() == END_CKPT || log[i]->getType() == BEGIN_CKPT )
      {
        continue;
      }




      if(log[i]->getType() == COMMIT)
      {
        //setLastLSN(log[i]->getTxID(),log[i]->getLSN());
        tx_table[log[i]->getTxID()] = txTableEntry(log[i]->getLSN(),C);

      }
      

      if(log[i]->getType() == UPDATE)
      {
       UpdateLogRecord *up = dynamic_cast <UpdateLogRecord * > (log[i]);
       //setLastLSN(log[i]->getTxID(),log[i]->getLSN());
       tx_table[log[i]->getTxID()] = txTableEntry(log[i]->getLSN(),U);

       if (dirty_page_table.count(up->getPageID()) == 0 || dirty_page_table[up->getPageID()] > up->getLSN())
       {
        dirty_page_table[up->getPageID()] = up->getLSN();
       }

      }

      if(log[i]->getType() == ABORT)
      {
       tx_table[log[i]->getTxID()] = txTableEntry(log[i]->getLSN(),U); 
      }
      //
      
      if(log[i]->getType() == CLR)
      { 
        CompensationLogRecord *clr = dynamic_cast<CompensationLogRecord*> (log[i]);
        tx_table[log[i]->getTxID()] = txTableEntry(log[i]->getLSN(),U);
        if (dirty_page_table.count(clr->getPageID()) == 0 || dirty_page_table[clr->getPageID()] > clr->getLSN())
        {
          dirty_page_table[clr->getPageID()] = clr->getLSN();
        }

      }      


    }

  }

  /*
   * Run the redo phase of ARIES.
   * If the StorageEngine stops responding, return false.
   * Else when redo phase is complete, return true. 
   */
  bool LogMgr::redo(vector <LogRecord*> log){
    int reclsn_smallest = 10000000;
    bool flag = true;
    map <int,int>::iterator it;
    vector<LogRecord*>::iterator iter;
    map< int,txTableEntry>::iterator tx;
    
    if(log.size() == 0)
      {return true;}
    
    //find reclsn_smallest

    for(it = dirty_page_table.begin(); it!=dirty_page_table.end();it++ )
    {
      if (it->second < reclsn_smallest) 
      {
        reclsn_smallest = it->second;
      }
    }
    
    for(iter = log.begin();iter != log.end();iter++)
    { 
      
      
      if((*iter)->getLSN() >= reclsn_smallest)
      {
        TxType type = (*iter)->getType();

        if(type == UPDATE)
        { 
          UpdateLogRecord* up = dynamic_cast<UpdateLogRecord *>(*iter);
          map<int, int >::iterator l_it;; 
          l_it = dirty_page_table.find(up->getPageID());
          if(l_it != dirty_page_table.end()  &&  l_it->second <= (*iter)->getLSN() && se->getLSN(up->getPageID()) <(*iter)->getLSN())
          {
            int a = up->getPageID();
            int b = up->getOffset();
            string c = up->getAfterImage();
            int lsn = (*iter)->getLSN();
            flag = se->pageWrite(a, b, c, lsn);
            if(flag == false)
            {
              return false;
            }
          }
        

        }


        if(type == CLR)
        {
          CompensationLogRecord* compensate = dynamic_cast<CompensationLogRecord *>(*iter);
          auto dirty_number = dirty_page_table.find(compensate->getPageID());
          if(dirty_page_table.count(compensate->getPageID()) != 0 && dirty_number->second <= (*iter)->getLSN() && se->getLSN(compensate->getPageID()) <(*iter)->getLSN())
          {
            int a = compensate->getPageID();
            int b = compensate->getOffset();
            string c = compensate->getAfterImage();
            int lsn = (*iter)->getLSN();
            flag = se->pageWrite(a, b, c, lsn); 
            if(flag == false)
            {
              return false;
            }

          }
        }

        /*if(type == COMMIT)
        {
          if (tx_table.count((*iter)->getTxID()) >= 1 && (tx_table.find((*iter)->getTxID()))->second.status == C) {
        logtail.push_back(new LogRecord(se->nextLSN(), getLastLSN((*iter)->getTxID()), (*iter)->getTxID(), END)); //carefull: getLastLSN()
        tx_table.erase((*iter)->getTxID());
        
        }          

        }*/


        }
      }



    for(tx=tx_table.begin(); tx != tx_table.end();)
          {
            if( tx->second.status == C )
                {

                   int lsn_in=se->nextLSN();
                   int txid = tx->first;
                   int  prev_lsn = tx->second.lastLSN;
                   LogRecord * LR = new  LogRecord(lsn_in, prev_lsn, txid, END );
                   logtail.push_back(LR);
                   tx = tx_table.erase(tx);
                 }
            else {
              tx++;
            }
          }
   
        
    return true;

  }

  /*
   * If no txnum is specified, run the undo phase of ARIES.
   * If a txnum is provided, abort that transaction.
   * Hint: the logic is very similar for these two tasks!
   */
  void LogMgr::undo(vector <LogRecord*> log, int txnum){
    priority_queue<int>ToUndo;
    map< int,txTableEntry>::iterator tx1;
    vector <LogRecord*>::iterator log1;
    //vector <LogRecord*>::iterator vter;
    bool flag1 = true;
    
    if(txnum != NULL_TX)
    {
      //If no txnum is specified, run the undo phase of ARIES.
      ToUndo.push(getLastLSN(txnum));
        
    }else
    {
      for(tx1 = tx_table.begin(); tx1 != tx_table.end(); tx1++)
      {
        if (tx1->second.status == C)
        {
          continue;
        } 
        ToUndo.push(tx1->second.lastLSN);
      }
    }


    while(!ToUndo.empty())
    {
      int maxium_lsn = ToUndo.top();
      
      //set initial value for type
      TxType type = END;
      //vter = log.begin();
      
      for(log1 = log.begin(); log1 != log.end(); log1++)
      { 
        if((*log1)->getLSN() == maxium_lsn)
        {
         type = (*log1)->getType();
         //vter = log1;
        break;
        }
      }
     //type = (*vter)->getType();


      switch(type)
      {
        //if type != one of {ABORT UPDATE CLR}
      
        

        case UPDATE:{
          //first create a CLR logrecord:find the relevant parameter;
          UpdateLogRecord* up = dynamic_cast<UpdateLogRecord *>(*log1);
          int p_id = up->getPageID();
          int tx_id = (*log1)->getTxID();
          int undo_nxtlsn = (*log1)->getprevLSN();
          int LSN_now = se->nextLSN();
          int p_offset = up->getOffset();
          string before_img = up->getBeforeImage();
          int pre_lsn = getLastLSN(tx_id);

          //build the CLR log record;
          CompensationLogRecord* compensation = new CompensationLogRecord(LSN_now, pre_lsn, tx_id, p_id, p_offset, before_img, undo_nxtlsn);
          logtail.push_back(compensation);

          tx_table[tx_id] = txTableEntry(compensation->getLSN(),U);//make change here!

          //if write permitted
          flag1 = se->pageWrite(p_id, p_offset, before_img, LSN_now);//
          if(flag1 == true){
            if(dirty_page_table.find(LSN_now) == dirty_page_table.end())
            {
              dirty_page_table.insert(pair<int,int>(p_id,LSN_now));
            }
          }
          else
          {
            break;
          }

          //update dirty_page_table
          if(dirty_page_table.count(up->getPageID()) == 0) 
          {
           //dirty_page_table[up->getPageID()] = compensation->getLSN();
            dirty_page_table.insert(pair<int,int>(p_id,LSN_now));
          }

          if(undo_nxtlsn != NULL_LSN)
          {
                ToUndo.push(undo_nxtlsn);
          }
          else
          {
              LogRecord* en = new LogRecord(se->nextLSN(), getLastLSN(up->getTxID()), tx_id, END);//pre_lsn,getLastLSN(ulr->getTxID())
              logtail.push_back(en);
              setLastLSN(tx_id,LSN_now);
              tx_table.erase(tx_id);
          }

          break;
        }

        case CLR:{

          CompensationLogRecord* cclr = dynamic_cast<CompensationLogRecord *>(*log1);
          int undo_next = cclr->getUndoNextLSN();
          int tx_id = (*log1)->getTxID();
          int pre_LSN = getLastLSN(tx_id);

          if(undo_next != NULL_LSN)
          {
            ToUndo.push(undo_next); 
          }
          else
          {
            LogRecord* een = new LogRecord(se->nextLSN(), pre_LSN, tx_id, END);//pre_LSN
            logtail.push_back(een);
            tx_table.erase(tx_id);
          }

          break;

        }

        case ABORT:{
          if ((*log1)->getprevLSN() != NULL_LSN)
            ToUndo.push((*log1)->getprevLSN());
          break;

        }

        default: {
          break;
        }

      }

      //remove from toUndo
      ToUndo.pop();

    }



  
  }





  vector<LogRecord*> LogMgr::stringToLRVector(string logstring){

    vector<LogRecord*> result;
    istringstream stream(logstring);
    string line;
    while (getline(stream, line))
    {
      LogRecord *lr = LogRecord::stringToRecordPtr(line);
      result.push_back(lr);
    }
    return result;


  }
  

  void LogMgr::abort(int txid){
   vector<LogRecord*> desired;
   int previous = -1;
   int lsnn = se->nextLSN();
   int if_find = tx_table.count(txid);
   if(if_find == 0)
   {
      previous = -1;
   }
   else
   {
     previous = getLastLSN(txid);
   }
   se->updateLog("");
   LogRecord * abrt = new LogRecord(lsnn, previous, txid, ABORT);
   logtail.push_back(abrt);
   //update tx table;
   setLastLSN(txid, lsnn);

   //get log from disk,combine with the log in logtail
   desired = stringToLRVector(se->getLog());
 
   //desired.insert(desired.end(), logtail.begin(), logtail.end());



   vector <LogRecord*>::iterator ittt;
   for(ittt = logtail.begin(); ittt != logtail.end(); ittt++)
   {
    desired.push_back(*ittt);
   }

   //put the log in the vector;
   undo(desired,txid);

   //tx_table.erase(txid);//??????????


  }

  /*
   * Write the begin checkpoint and end checkpoint
   */
  void LogMgr::checkpoint(){
    int lsn_next = se->nextLSN();
    LogRecord* temp = new  LogRecord(lsn_next, NULL_LSN, NULL_TX, BEGIN_CKPT);
    logtail.push_back(temp);
    int lsnnext = se->nextLSN();
    //here made a previous mistake by set the ckpt type to LogRecord*
    ChkptLogRecord* temp1 = new  ChkptLogRecord(lsnnext, lsn_next, NULL_TX, tx_table, dirty_page_table);
    logtail.push_back(temp1);
    flushLogTail(lsnnext);
    se->store_master(lsn_next);

  }

  /*
   * Commit the specified transaction.
   */
  void LogMgr::commit(int txid){
    int lsn_next = se->nextLSN();
    int prev_lsn = getLastLSN(txid);
    int lsnnext = se->nextLSN();
    LogRecord* temp = new LogRecord(lsn_next, prev_lsn, txid, COMMIT);
    logtail.push_back(temp);
    //Update tx_table;
    setLastLSN(txid,lsn_next);
    //tx_table[txid] = txTableEntry(lsn_next,C);
    flushLogTail(lsn_next);

    //set end_prelsn
    int end_prelsn = getLastLSN(txid);
    logtail.push_back(new LogRecord(lsnnext,end_prelsn,txid,END));
    tx_table.erase(txid);
      
  }

  /*
   * A function that StorageEngine will call when it's about to 
   * write a page to disk. 
   * Remember, you need to implement write-ahead logging
   */
  void LogMgr::pageFlushed(int page_id){
    int LSN_max = se->getLSN(page_id);
    flushLogTail(LSN_max);
    dirty_page_table.erase(page_id);
  }

  /*
   * Recover from a crash, given the log from the disk.
   */
  void LogMgr::recover(string log){
    vector<LogRecord*> prefer;
    prefer = stringToLRVector(log);
    analyze(prefer);
    if(redo(prefer) == 1)
    {
      undo(prefer);
    }

  }

  /*
   * Logs an update to the database and updates tables if needed.
   */
  int LogMgr::write(int txid, int page_id, int offset, string input, string oldtext){
   int lsn_next = se->nextLSN();
   int prev_lsn = getLastLSN(txid);
   logtail.push_back(new UpdateLogRecord(lsn_next, prev_lsn, txid, page_id, offset, oldtext, input));
   //setLastLSN(txid, lsn_next);

   int find_table = dirty_page_table.count(page_id);
   if(find_table == 0)
   {
      dirty_page_table.insert(map< int,int>::value_type(page_id, lsn_next ));
   }
   tx_table[txid] = txTableEntry(lsn_next,U);
   return lsn_next;
 }

  /*
   * Sets this.se to engine. 
   */
  void LogMgr::setStorageEngine(StorageEngine* engine){
    this->se = engine;
  }

 