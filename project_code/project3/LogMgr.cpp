#include "LogMgr.h"
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
using namespace std;


///////////////////  LogMgr  ///////////////////

  //map <int, txTableEntry> tx_table;
  //map <int, int> dirty_page_table;
  //vector <LogRecord*> logtail;

  /*
   * Find the LSN of the most recent log record for this TX.
   * If there is no previous log record for this TX, return
   * the null LSN.
   */
  int LogMgr::getLastLSN(int txnum)
  {

       int findtx = tx_table.count(txnum);

       if (findtx==0)
  	    {return -1;}
       else
   	    {return tx_table[txnum].lastLSN;}
  }



  /*
   * Update the TX table to reflect the LSN of the most recent
   * log entry for this transaction.
   */
  void LogMgr::setLastLSN(int txnum, int lsn)
  {
        tx_table[txnum].lastLSN=lsn;

  }



   /*
   * Force log records up to and including the one with the
   * maxLSN to disk. Don't forget to remove them from the
   * logtail once they're written!
   */
  void LogMgr::flushLogTail(int maxLSN)

  {
	  int count_before_maxLSN=0;

		    	if(!logtail.empty())
		    	{
		    		for(   int i=0;i< (int)logtail.size();i++)
		   		 {      if(logtail[i]->getLSN()<= maxLSN)
		   	 		{
		              	        count_before_maxLSN=count_before_maxLSN+1;
		    			        se->updateLog(logtail[i]->toString());
		   	 		//logtail.erase(logtail.begin()+i);
		               }
		   		 }
		   	 //logtail.clear();
		       	   for (int j=0;j<count_before_maxLSN;j++)
		         	   {   //delete logtail[j];
		       		   logtail.erase(logtail.begin(),logtail.begin()+1);}

		   	 }

  }






  //StorageEngine* se;

  /*
   * Run the analysis phase of ARIES.
   */
  void LogMgr::analyze(vector <LogRecord*> log)
  {
	            int cp_position=0;
	            int count=0;
	            int masterLSN = se->get_master();


	            for( vector <LogRecord*>::iterator lovit=log.begin(); lovit!= log.end(); lovit++)
	                {
	            	         if ((*lovit)->getType() == END_CKPT)
	            	         {
	            	        	 ChkptLogRecord * lovpointer = dynamic_cast <ChkptLogRecord * > (*lovit) ;
	            	        	 tx_table = lovpointer -> getTxTable();
	            	        	 dirty_page_table = lovpointer -> getDirtyPageTable();
	            	         }

	                }


	            txTableEntry tx_entry;
	            //TxStatus status = "U";
	            if(log.size() == 0)
	               {return;}
	            // get position of cp_lsn
	            for( vector <LogRecord*>::iterator it = log.begin(); it != log.end(); it++)
	     	   {
	              	    if ( (*it)->getLSN() == masterLSN )
	               	       {cp_position = count;}
	                      count = count+1;
	      	   }
	            //If we find end-tx in log, remove it from tx table
	            //If we find log entry for tx not in table, add it to table
	            //If we find log entry that impacts page P, and P is not in dirty page table, add it to table
	            //int cp_pos=0;
	            //while(log[cp_pos]->getLSN!=(master_LSN))
	            //{++cp_pos;}
	            for ( int i=cp_position ; i< (int)log.size(); i++ )
	              {
	                      if (log[i]->getType() == END)
	                      {

                                int findtx = tx_table.count(log[i]->getTxID());

	        			         if(findtx==0)
	                             {

	  		  	                 }
	         			         else  tx_table.erase(log[i]->getTxID());
	                      }

	                      if (log[i]->getType() == COMMIT)
	                      {

                                  int findtx = tx_table.count(log[i]->getTxID());

	                    	  	  if(findtx==0)
	                             {
	                    	  		  tx_entry.lastLSN = log[i]->getLSN();
	                                  tx_entry.status = C;
	                                  tx_table.insert(map< int,txTableEntry>::value_type(log[i]->getTxID(), tx_entry ));
	                             }
	                    	  	  else  {tx_table[log[i]->getTxID()].status = C; tx_table[log[i]->getTxID()].lastLSN = log[i]->getLSN();}
	                      }


	                      if (log[i]->getType() == ABORT)//not sure
	                      {

                                  int findtx = tx_table.count(log[i]->getTxID());
	                    	  	  if(findtx==0)
	                             {
	                    	  		  tx_entry.lastLSN = log[i]->getLSN();
	                    	  		  tx_entry.status = U;
	                    	  		  tx_table.insert(map< int,txTableEntry>::value_type(log[i]->getTxID(), tx_entry ));
	                             }
	                    	  	  else  {tx_table[log[i]->getTxID()].status = U; tx_table[log[i]->getTxID()].lastLSN = log[i]->getLSN();}
	                      }


	                      if(log[i]->getType()  == UPDATE)
	                      {
	                    	  	  UpdateLogRecord * pointer = dynamic_cast <UpdateLogRecord * > (log[i]) ;

                                  int findtx1 = dirty_page_table.count( pointer->getPageID());
	                          	  if(findtx1==0)
	                             {
	                          		  dirty_page_table.insert(map< int,int>::value_type(pointer->getPageID(), pointer->getLSN() ));
	                             }
	         			//else  {}//dirty_page_table[log[i]->getPageID()] = log[i]->getLSN();




				              int findtx = tx_table.count(log[i]->getTxID());

	                          if(findtx==0)

                        {
	                        	  	  tx_entry.lastLSN = log[i]->getLSN();
	                        	  	  tx_entry.status = U;
	                        	  	  tx_table.insert(map< int,txTableEntry>::value_type(log[i]->getTxID(), tx_entry ));
	                             }
	                          else  {tx_table[log[i]->getTxID()].status = U; tx_table[log[i]->getTxID()].lastLSN = log[i]->getLSN();}

	                      }

	                      if(log[i]->getType()  == CLR)
	                      {
	                    	  CompensationLogRecord * pointer = dynamic_cast <CompensationLogRecord * > (log[i]) ;

	                          //d_it=dirty_page_table.find(pointer->getPageID());
			                  int findtx1 = dirty_page_table.count(pointer->getPageID());
	                          if(findtx1==0)
	                             {
	                        	  	  dirty_page_table.insert(map< int,int>::value_type(pointer->getPageID(), pointer->getLSN() ));
	                             }
	                          //else  {}//dirty_page_table[log[i]->getPageID()] = log[i]->getLSN();
	                          //map< int,txTableEntry>::iterator t_it;
                                 int findtx = tx_table.count(log[i]->getTxID());
	                          //t_it=tx_table.find(pointer->getTxID());
	                           if(findtx==0)
	                             {
	                          	  	  tx_entry.lastLSN = pointer->getLSN();
	                          	  	  tx_entry.status = U;
	                          	  	  tx_table.insert(map< int,txTableEntry>::value_type(pointer->getTxID(), tx_entry ));
	                             }
	                          else  {tx_table[log[i]->getTxID()].status = U; tx_table[log[i]->getTxID()].lastLSN = log[i]->getLSN();}

	                      }


	  	     }




  }




  /*
   * Run the redo phase of ARIES.
   * If the StorageEngine stops responding, return false.
   * Else when redo phase is complete, return true.
   */
  bool LogMgr::redo(vector <LogRecord*> log)
      {
	          if(log.size() == 0)
	              {return true;}

	          //int index;
	          int page_LSN;
	          int minLSN=dirty_page_table.begin()->second;
	 	      bool flag = true;
	          int count = 0 ;
	          int minLSN_pos= 0;
	          int lsn_in,prev_lsn,txid;
	         //find min recLSN
	         for(map< int,int>::iterator d_it=dirty_page_table.begin(); d_it != dirty_page_table.end(); d_it++)
	         {
	          	if(d_it->second < minLSN)
	               minLSN = d_it->second;
	 	     }


	           // get position of minLSN_
	          for( vector <LogRecord*>::iterator it = log.begin(); it != log.end(); it++)
	    	     {
	             	 if ( (*it)->getLSN() == minLSN )
	              	 {minLSN_pos = count;}
	                  count = count+1;
	    	     }

	         //scan forward
	 	for ( int  i = minLSN_pos ; i< (int)log.size(); i++ )
	     {
	 		if( log[i]->getType()  == UPDATE  )
	 		{
	 			 UpdateLogRecord * pointer = dynamic_cast <UpdateLogRecord * > (log[i]) ;
	 			 //map< int,int>::iterator dit;
	             //dit=dirty_page_table.find(pointer->getPageID());
                     int findtx1 = dirty_page_table.count(pointer->getPageID());

	 			 if(findtx1!=0)

	 				if(dirty_page_table[pointer->getPageID()]<= pointer->getLSN() )
	                         	   //index=se-> findPage(dit->first);
	                         	   {
	                                     page_LSN=se->getLSN(pointer->getPageID());

	                                     if(page_LSN < pointer->getLSN() )
	                                     {
	                                    	flag=se->pageWrite(pointer->getPageID(), pointer->getOffset(), pointer->getAfterImage(), pointer->getLSN() );
	                                        if(flag == false)
	                                        return false;
	                                     }
	                                }
	                         		//else {}
	                 		//else {}
	         		//else {}
	         }

	 		if( log[i]->getType()  == CLR)
	 				{
	 			        CompensationLogRecord * pointer = dynamic_cast <CompensationLogRecord * > (log[i]) ;
	 			 		//map< int,int>::iterator dit;
	 		            //dit=dirty_page_table.find(pointer->getPageID());
                                    int findtx1 = dirty_page_table.count(pointer->getPageID());
	 					if(findtx1!=0)

	 						if(dirty_page_table[pointer->getPageID()] <= pointer->getLSN() )
	 		                        	   //index=se-> findPage(dit->first);
	 		                        	   {
	 		                                    page_LSN=se->getLSN(pointer->getPageID());

	 		                                    if(page_LSN < pointer->getLSN() )

	 		                                    {  flag=se->pageWrite(pointer->getPageID(), pointer->getOffset(), pointer->getAfterImage(), pointer->getLSN() );
	 		                                       if(flag == false)
	 		                                   	   return false;
	 		                                    }
	 		                                }
	 		                        		//else {}
	 		                		//else {}
	 		        		//else {}
	 		          }

	 	}



	 	for(map< int,txTableEntry>::iterator tt_it=tx_table.begin(); tt_it != tx_table.end();)
	 		 		{
	 		 			if( tt_it->second.status == C )
	 		 				  {

	 		 				     lsn_in=se->nextLSN();
	 		 				     txid = tt_it->first;
	 		 				     prev_lsn = tt_it->second.lastLSN;
	 		 				     LogRecord * LR2 = new  LogRecord(lsn_in, prev_lsn, txid, END );
	 		 				   	 logtail.push_back(LR2);
	 		 				   tt_it = tx_table.erase(tt_it);
	 		 				   }
	 		 			else {
	 		 				tt_it++;
	 		 			}
	 		 		}
	 //???????????????????????stop responding????????????????????????

	 	 if(flag == false)
	 	 return false;
	 	 else
	 	 return true;
      }
   /*
   * If no txnum is specified, run the undo phase of ARIES.
   * If a txnum is provided, abort that transaction.
   * Hint: the logic is very similar for these two tasks!
   */
  void LogMgr::undo(vector <LogRecord*> log, int txnum )//NULL_TX??????????????????????????????
   {
	         //int To_undo = -1;
	         vector <int> live_tx;
	         vector <int> To_undo;  //lastLSN_tx;
	         int maxL;
	         int maxL_pos=0;
	         bool flag;
	         int lsn_in,prev_lsn=-1;
	         int txid, page_id, page_offset;
	  	     string after_img;
	         int undo_next_lsn;
	         int i;
	         vector <int> abort_lsn;

	         txTableEntry tx_entry;
	         int max_pos;


if(txnum == NULL_TX)
	  {

	 //find all live trans at crash point
		            for(map< int,txTableEntry>::iterator t_it=tx_table.begin(); t_it != tx_table.end(); t_it++)
		               {
		            		if( t_it->second.status == U )
		            			{
		            				live_tx.push_back(t_it->first);
		            				To_undo.push_back(t_it->second.lastLSN);
		            			}
		               }
		            //To_undo list
		            //sort(vec.begin(),vec.end());
		            //maxLSN= *max_element(To_undo.begin(),To_undo.end());
		            //To_undo = maxLSN;
		            while( To_undo.size()!=0 )
		            {
		                   //maxL= *max_element(To_undo.begin(),To_undo.end());
		                   maxL=-1;
		            	   //for(int j=0; j<To_undo.size();j++)
		                   //{
		            		  // if (To_undo[j]>maxL)
			                   //maxL=To_undo[j];
		                   //}

		                  for(int j=0; j<(int)To_undo.size();j++)
		                  	         {
		                  	            if (To_undo[j]>maxL)
		                  		          {
		                  	            		maxL=To_undo[j];
		                  	            		max_pos=j;
		                  		          }

		                  	          }

		                   maxL_pos=0;
		                   while(log[maxL_pos] -> getLSN() != (maxL))
		                   {++maxL_pos;}

		                   //for ( i=maxL_pos; i>-1; i-- )
		                   // {
		                   i = maxL_pos;

		  //?????????????????????????????what about ABORT??????????????????????????????
		                         if( log[i] ->getType() == UPDATE )
		                             {
		                        	     lsn_in=se->nextLSN();
		                             	 //undo
		                        	 	 UpdateLogRecord * pointer = dynamic_cast <UpdateLogRecord * > (log[i]) ;
		                        	 	flag=se->pageWrite (pointer->getPageID(), pointer->getOffset(), pointer->getBeforeImage(), lsn_in );//pointer->getLSN() );//????????getLSNorclrlsn
		                        	 	if(flag== false)
		                        	 	return;

                                         txid = pointer->getTxID() ;
		                        	     //map< int,txTableEntry>::iterator findprvlsn;

                                         int findtxxxx = tx_table.count(txid);


		                        	        //findprvlsn=tx_table.find(txid);
		                        	 	 if(findtxxxx==0)
		                        	 	{
		                        	 	    prev_lsn=-1;

		                        	 	 }
		                        	 	 else  {prev_lsn=tx_table[txid].lastLSN;}



		                        	 	 page_id = pointer->getPageID();
		                        	 	 page_offset = pointer->getOffset();
		                        	 	 after_img = pointer->getBeforeImage();
		                        	 	 undo_next_lsn = pointer->getprevLSN();
		                        	 	 CompensationLogRecord * CLRR = new CompensationLogRecord(lsn_in, prev_lsn, txid, page_id, page_offset, after_img, undo_next_lsn );
		                        	 	 logtail.push_back(CLRR);
		                        	 	 //To_undo.pop_back();
		                        	 	 //To_undo.erase(To_undo.begin()+max_pos,(To_undo.begin()+max_pos+1));
                                         //map< int,txTableEntry>::iterator t_it;
		                        	 	 int findtxxx = tx_table.count(txid);
		                        	 		//t_it=tx_table.find(txid);
		                        	 	if(findtxxx==0)
		                        	 		{
		                        	 		    tx_entry.lastLSN = lsn_in;
		                        	 		    tx_entry.status = U;
		                        	 		    tx_table.insert(map< int,txTableEntry>::value_type(txid, tx_entry ));
		                        	 		 }
		                        	 	else  {tx_table[txid].status = U; tx_table[txid].lastLSN = lsn_in;}





	                                    if(log[i]->getprevLSN()!=(-1))
		                        	 	To_undo.push_back(log[i]->getprevLSN());
	                                    else
	                                    {
	                                    	prev_lsn = lsn_in;
	                                    	lsn_in=se->nextLSN();

	                                    	txid = pointer->getTxID();
	                                    	int findtx = tx_table.count(txid);

	                                    	if(findtx == 0)
	                                    	{}
	                                    	else {

	                                    		   tx_table.erase(txid);
	                                    	       LogRecord * LR2 = new  LogRecord(lsn_in, prev_lsn, txid, END );
	                                    	       logtail.push_back(LR2);

	                                    	      }
	                                    }

		                             }

		                         if( log[i] ->getType() == CLR )
		                             {

		                        	     //lsn_in=se->nextLSN();
		                        	 	 CompensationLogRecord * pointer = dynamic_cast <CompensationLogRecord * > (log[i]) ;
		                        	 	 //se->pageWrite (pointer->getPageID(), pointer->getOffset(), pointer->getBeforeImage(), lsn_in );
		                        	 	 //To_undo.pop_back();
	                                     if(pointer->getUndoNextLSN()!=(-1))
		                        	 	    To_undo.push_back(pointer->getUndoNextLSN());
	                                     else
	                                     {

	                                    	 lsn_in=se->nextLSN();
	                                    	 prev_lsn = pointer->getLSN();
	                                    	 txid = pointer->getTxID();
	                                    	 int findtx = tx_table.count(txid);

	                                    	 	                 	                 //if(l_it==tx_table.end())
	                                    	 if(findtx == 0)
	                                    	 {}
	                                    	 else
	                                    	   {tx_table.erase(txid);
	                                    	    LogRecord * LR2 = new  LogRecord(lsn_in, prev_lsn, txid, END );
	                                    	   logtail.push_back(LR2);}
	                                     }



		                             }

		                          To_undo.erase(To_undo.begin()+max_pos,(To_undo.begin()+max_pos+1));



		            }


	  }
else
	  {      //abort

	for( vector <LogRecord*>::reverse_iterator lit=log.rbegin(); lit!= log.rend(); lit++)
	     	    	{  //write CLR


	          	    	if ((*lit)-> getTxID()  == txnum)
	          	    		{

	          	    		      if( (*lit)-> getType() == ABORT )
	          	    		      {
	          	    		    	  int previous_lsn_abort = (*lit)->getprevLSN();
	          	    		    	  if( previous_lsn_abort == -1 )
	          	    		    	  {
	          	    		    		prev_lsn = (*lit)->getLSN();
	          	    		    		lsn_in=se->nextLSN();

	          	    		    		//txid = pointer->getTxID();
	          	    		    		int findtx = tx_table.count(txnum);
	          	    		    			                            	  		             	                 //if(l_it==tx_table.end())
	          	    		    		if(findtx == 0)
	          	    		    		{}
	          	    		    		else {
	          	    		    			     tx_table.erase(txnum);
	          	    		    			     LogRecord * LR2 = new  LogRecord(lsn_in, prev_lsn, txnum, END );
	          	    		    			     logtail.push_back(LR2);
	          	    		    	         }
	          	    		    		return;
	          	    		          }
	          	    		      }




	                              if( (*lit)-> getType() == UPDATE )
	                                {
	                            	      lsn_in=se->nextLSN();
	                            	  	  UpdateLogRecord * pointer = dynamic_cast <UpdateLogRecord * > (*lit) ;
	                            	  	  flag=se->pageWrite (pointer->getPageID(), pointer->getOffset(), pointer->getBeforeImage(), lsn_in );
	                            	  	  if(flag== false)
	                            	  	  return;

	                            	  	  //prev_lsn = (*lit)->getLSN();
	                            	  	  txid = (*lit)->getTxID();
	                            	  	  page_id =pointer->getPageID();
	                            	  	  page_offset = pointer->getOffset();
	                            	  	  after_img = pointer->getBeforeImage();
	                            	  	  undo_next_lsn = (*lit)->getprevLSN();


	                            	  	 int findtxxxx = tx_table.count(txnum);



	                            	  	//findprvlsn=tx_table.find(txid);
	                            	  	  if(findtxxxx==0)
	                            	  	  {
	                            	  	       prev_lsn=-1;

	                            	       }
	                            	  	   else  {prev_lsn=tx_table[txnum].lastLSN;}


	                            	  	  CompensationLogRecord * CLRRR = new CompensationLogRecord(lsn_in, prev_lsn, txid, page_id, page_offset, after_img, undo_next_lsn );

	                            	  	  logtail.push_back(CLRRR);
	                            	  	  //change tables
	                            	  	  //map< int,int>::iterator d_it;
	                            	  	  //d_it=dirty_page_table.find(pointer->getPageID());
					                      int findtx1 = dirty_page_table.count(pointer->getPageID());
	                            	  	  if(findtx1==0)
	                            	  	  {
	                            	  		       dirty_page_table.insert(map< int,int>::value_type(page_id, lsn_in ));
	                            	  	  }
	                            	  	  //else  {}//dirty_page_table[pag_id] = lsn_in;

	                            	  	  //map< int,txTableEntry>::iterator t_it;
	                            	  	  //t_it=tx_table.find(txnum);
                                          int findtx = tx_table.count(txnum);
	                            	  	  if(findtx==0)
	                            	  	  {
	                            	  		  tx_entry.lastLSN = lsn_in;
	                            	  		  tx_entry.status = U;
	                            	  		  tx_table.insert(map< int,txTableEntry>::value_type(txnum, tx_entry ));
	                            	  	  }
	                            	  	  else  {tx_table[txnum].status = U; tx_table[txnum].lastLSN = lsn_in;}


	                            	  	   if(undo_next_lsn==(-1))

	                            	  		{
	                            	  		   prev_lsn = lsn_in;
	                            	  		   lsn_in=se->nextLSN();

	                            	  		   //txid = pointer->getTxID();
	                            	  		   int findtx = tx_table.count(txnum);
	                            	  		             	                 //if(l_it==tx_table.end())
	                            	  		   if(findtx == 0)
	                            	  		   {}
	                            	  		   else {
	                            	  		      tx_table.erase(txnum);
	                            /Users/tianzhang/Documents/LogMgr_yyy.cpp	  		      LogRecord * LR2 = new  LogRecord(lsn_in, prev_lsn, txnum, END );
	                            	  		      logtail.push_back(LR2);
	                            	               }
	                                          }
	                                }

	          	    		}
	          	     }


	  }

   }



  vector <LogRecord*> LogMgr::stringToLRVector(string logstring)
  {
	  vector<LogRecord*> result;

	  istringstream stream(logstring);
	  string line;
	  while(getline(stream, line)) {
	  	LogRecord* lr = LogRecord::stringToRecordPtr(line);
	  	result.push_back(lr);
	  }
	  return result;
   }





  /*
   * Abort the specified transaction.
   * Hint: you can use your undo function
   */
  void LogMgr::abort(int txid)
   {
	  int lsn_in,prev_lsn=-1;
	  	  lsn_in=se->nextLSN();
	  	txTableEntry tx_entry;

	  	 //map< int,txTableEntry>::iterator findprvlsn;
	  	       //findprvlsn=tx_table.find(txid);
            int findtx = tx_table.count(txid);
	  		if(findtx == 0)
	  		{
	  		    prev_lsn=-1;
	  		 }
	  		 else  {prev_lsn=tx_table[txid].lastLSN;}
		LogRecord * LR = new LogRecord(lsn_in, prev_lsn, txid, ABORT);
		logtail.push_back(LR);

		int findtxx = tx_table.count(txid);
		if(findtxx==0)
			   {
			      tx_entry.lastLSN = lsn_in;
			      tx_entry.status = U;
			      tx_table.insert(map< int,txTableEntry>::value_type(txid, tx_entry ));
			    }
		else  {tx_table[txid].status = U; tx_table[txid].lastLSN = lsn_in;}

		    string log_ondisk = se->getLog();
		    vector <LogRecord*> log_ondisk_vec;
		    log_ondisk_vec = stringToLRVector( log_ondisk);
		    vector <LogRecord*> log_all;
			for(int i=0; i<(int)log_ondisk_vec.size();i++)
			log_all.push_back(log_ondisk_vec[i]);
			for(int i=0; i<(int)logtail.size();i++)
			log_all.push_back(logtail[i]);


	    undo( log_all , txid );
   }






 /*
   * Write the begin checkpoint and end checkpoint
   */
  void LogMgr::checkpoint()
  {
	  //begin_ckpt
	        int lsn_in,prev_lsn=-1;
	        lsn_in=se->nextLSN();
	        //logRecord::TxType type=BEGIN_CKPT;
	        LogRecord * LR = new LogRecord(lsn_in, prev_lsn, -1, BEGIN_CKPT );
	        se->store_master(lsn_in);
	        logtail.push_back(LR);



	        int lsn_in_end;
	        lsn_in_end=se->nextLSN();

	    //why only have end_ckpt
	        ChkptLogRecord * CLR = new ChkptLogRecord(lsn_in_end, lsn_in, -1, tx_table, dirty_page_table ); //????????????????????????
	        logtail.push_back(CLR);


	        flushLogTail(lsn_in_end);

   }





 /*
   * Commit the specified transaction.
   */
  void LogMgr::commit(int txid)//
  {
	  int lsn_in,prev_lsn=-1;
	  lsn_in=se->nextLSN();


	  int findtx = tx_table.count(txid);

	  if(findtx == 0)
	  { prev_lsn=-1; }
	  else {

		  prev_lsn=tx_table[txid].lastLSN;

	  	    }


    //LogRecord::TxType type= END;
    //logtail.push_back(logtail[logtail.size()-1]->stringToRecordPtr(logtail[logtail.size()-1]->toString(lsn_in, prev_lsn, txid, END )));
    LogRecord * LR1 = new  LogRecord(lsn_in, prev_lsn, txid, COMMIT );
    logtail.push_back(LR1);

    flushLogTail(lsn_in);

    prev_lsn=lsn_in;
    lsn_in=se->nextLSN();
  //for( vector <LogRecord*>::iterator it=logtail.begin(); it!= logtail.end(); it++)
	  //  {
   	//if ((*it)->getTxID()   == txid)
    	//   prev_lsn = (*it)->getLSN();
	   // }
  //LogRecord::TxType type= END;
  //logtail.push_back(logtail[logtail.size()-1]->stringToRecordPtr(logtail[logtail.size()-1]->toString(lsn_in, prev_lsn, txid, END )));
    int flag = tx_table.count(txid);
      //if(l_it==tx_table.end())
      if(flag==0)
            {}
      else  tx_table.erase(txid);
  LogRecord * LR2 = new  LogRecord(lsn_in, prev_lsn, txid, END );
  logtail.push_back(LR2);


   }



 /*
   * A function that StorageEngine will call when it's about to
   * write a page to disk.
   * Remember, you need to implement write-ahead logging
   */
  void LogMgr::pageFlushed(int page_id)
  {
            int lsn_max = se->getLSN(page_id);
	        flushLogTail(lsn_max);
	        dirty_page_table.erase(page_id);
   }



  /*
   * Recover from a crash, given the log from the disk.
   */
  void LogMgr::recover(string log)
   {
	   bool flag =true;
	   //string log_ondisk;
	   vector <LogRecord*> log_ondisk_vec;
	   //log_ondisk = se->getLog();
	   //log_ondisk_vec = stringToLRVector(log_ondisk);
	   log_ondisk_vec = stringToLRVector(log);
	   analyze(log_ondisk_vec);

	   flag=redo(log_ondisk_vec);
	   if(flag == true)
	   undo(log_ondisk_vec);//????????????
	   return;
   }


   /*
   * Logs an update to the database and updates tables if needed
   */
  int LogMgr::write(int txid, int page_id, int offset, string input, string oldtext)
  {
       int lsn_in,prev_lsn=-1;
       lsn_in=se->nextLSN();
       txTableEntry tx_entry;
       //TxType logtype;
       //TxType logtailtype;


    //map< int,txTableEntry>::iterator findprvlsn;
    int findtxxx = tx_table.count(txid);
    //findprvlsn=tx_table.find(txid);
	if(findtxxx ==0)
	{
	    prev_lsn=-1;

	 }

	else  {prev_lsn=tx_table[txid].lastLSN;}



       //logtail.push_back(logtail[logtail.size()-1]->stringToRecordPtr(logtail[logtail.size()-1]->toString(lsn_in, prev_lsn, txid, page_id, offset, input, oldtext)));
       UpdateLogRecord * ULR = new UpdateLogRecord(lsn_in, prev_lsn, txid, page_id, offset, oldtext, input );//???????????????
       logtail.push_back(ULR);
                 //update tables
       //map< int,int>::iterator d_it;
       int findtx1 = dirty_page_table.count(page_id);
      // d_it=dirty_page_table.find(page_id);
			   if(findtx1  == 0)
               {
           		      dirty_page_table.insert(map< int,int>::value_type(page_id, lsn_in ));
		  	   }
       			//else  dirty_page_table[page_id] = lsn_in;




                //map< int,txTableEntry>::iterator t_it;
                 int findtxxxxx = tx_table.count(txid);
       			//t_it=tx_table.find(txid);
      			if(findtxxxxx ==0)
                           {
			                  tx_entry.lastLSN = lsn_in;
                              tx_entry.status = U;
           		              tx_table.insert(map< int,txTableEntry>::value_type(txid, tx_entry ));
		  	               }
       			else  {tx_table[txid].status = U; tx_table[txid].lastLSN = lsn_in;}

                return lsn_in;

  }


  //void setStorageEngine(StorageEngine* engine);
  /*
   * Sets this.se to engine.
   */
  void LogMgr::setStorageEngine (StorageEngine* engine)
  {     se=engine;      }


/////////////////// End LogMgr  ///////////////////


