<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use DateTime;

use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
	public function sendConfirmation($nameUser,$boilerName,$boilerAbout,$boilerTitle,$boilerImage,$boilerPrice,$installationDate,$videoDate,$logoUrl,$finalPrice,$name,$title,$price,$image,$address,$postalCode){
		$txt = '<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td>
			<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
			 	<tr>
			  		<td align="center" style="padding: 20px 0 20px 0;">
						<img src="'.$logoUrl.'" width="150" height="auto" style="display: block;" />
					</td>
                 </tr>
                 <tr>
                   <td>
                   Dear '.$nameUser.'
                   </td> 
                 </tr>

                 <tr>
                 <td style="padding-top: 10px;">
                 Thanks for your order!
                 </td> 
               </tr>

               <tr>
               <td style="padding-top: 10px;">
               We now need a few photos of your existing system. This is to make sure everything goes ahead smoothly on the installation date. This should only take a few minutes and can be done directly from your smartphone by clicking on the button below
               </td> 
             </tr>

            

             <tr>
             <td style="padding-top: 20px;padding-bottom: 20px;">
             <a _ngcontent-phu-c326="" href="javascript:void(0)" style="
             background: #EC346B!important;
             color: white!important;
             border: 2px solid #EC346B!important;
             text-decoration: none!important;padding: 10px 20px;" class="thnk-btn-2">Take and send photos</a>

             </td> 
           </tr>

           <tr>
             <td style="padding-top: 10px;">
             We need these photos at least 24 hours before your installation date, otherwise it may cause delays to your installation.

             </td> 
           </tr>

        

        




				<tr>
				  <td align="left" style="font-size: 18px; line-height: 28px;font-weight: 600;padding-top: 10px;">
                  Details of your installation order
				  </td>
                </tr>
                <tr>
                <td style="padding-top: 10px;">
               Installation Date : '.date_format(new DateTime($installationDate),'D m F Y').'
                </td>
                </tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 30px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="top">
								<img src="'.$boilerImage.'" width="120">
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">'.$boilerName.'</td>
	                    		</tr>
	                    		<tr>
	                    			<td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">'.$boilerTitle.'</td>
	                    		</tr>
			                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$boilerPrice.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 10px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="middle">
								<img src="'.$image.'" width="130">
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">'.$name.'</td>
	                    		</tr>
	                    		<tr>
	                    			<td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">'.$title.'</td>
	                    		</tr>			                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="top" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="top" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$price.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 10px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="middle">
								&nbsp;
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="240" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">Total</td>
	                    		</tr>	                    				                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Total Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$finalPrice.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
                <tr>
                <td align="left" style="font-size: 18px; line-height: 28px;font-weight: 600;padding-top: 10px;">
                Installation 
     
     
                </td> 
              </tr>
     
       <tr>
       <td style="padding-top: 10px;">
                On the day of the installation, your installer will arrive between 8am and 9am. Depending on the type of installation, there may be 1 or 2 engineers.
                </td>
                </tr>
     
             <tr>
             <tr>
     
             <td style="padding-top: 10px;">
     
                You donâ€™t have to make any special arrangements within your home, unless our surveyor specifically asks at the time of the pre-install survey. For example, if your boiler is housed inside a cupboard which is full of household items, we may ask you to remove these items prior to the installation.
     
                </td>
                </tr>
                
                <tr>
                <td style="padding-top: 10px;">
                Once the installation is complete, our installer will show you how to operate the controls, and ensure you are left with a copy of the necessary paperwork.
                </td>
                </tr>
     
                <tr>
                <td style="padding-top: 10px;">
                We will register your manufacturerâ€™s warranty from the office. You donâ€™t need to do this.
                </td>
                </tr>
     
                <tr>
                <td style="padding-top: 10px;">
                Finally, once our installers are finished and packing up to leave, we will charge your card for the amount of the installation and email you a receipt.
                </td>
                </tr>
     
                <td style="padding-top: 10px;">
                If you have any questions in the meantime, please donâ€™t hesitate to contact us via email (you can reply to this email), phone (0800 368 9837) , or live chat on our website (directheating.co.uk).
                
     
     
                </td> 
              </tr>
				
			</table>
   		</td>
  	</tr>
 </table>';

		return $txt;
	}
    
    
    public function sendConfirmationAdmin($boilerName,$boilerAbout,$boilerTitle,$boilerImage,$boilerPrice,$installationDate,$videoDate,$logoUrl,$finalPrice,$name,$title,$price,$image,$address,$postalCode,$userInfo,$productInformation,$phone){
		$txt = '<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td>
			<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
			 	<tr>
			  		<td align="center" style="padding: 20px 0 20px 0;">
						<img src="'.$logoUrl.'" width="150" height="auto" style="display: block;" />
					</td>
                 </tr>
                 
                 

               <tr>
               <td style="padding-top: 10px;">
               Installation Date : '.date_format(new DateTime($installationDate),'D m F Y').'
               </td> 
             </tr>

             <tr>
             <td style="padding-top: 10px;">
             Contact: '.$phone.'
             </td> 
           </tr>

				
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 30px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="top">
								<img src="'.$boilerImage.'" width="120">
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">'.$boilerName.'</td>
	                    		</tr>
	                    		<tr>
	                    			<td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">'.$boilerTitle.'</td>
	                    		</tr>
			                   
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$boilerPrice.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 10px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="middle">
								<img src="'.$image.'" width="130">
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">'.$name.'</td>
	                    		</tr>
	                    		<tr>
	                    			<td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">'.$title.'</td>
	                    		</tr>			                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="top" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="top" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$price.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 10px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="middle">
								&nbsp;
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="240" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">Total</td>
	                    		</tr>	                    				                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Total Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$finalPrice.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>

                <tr>
        <td style="font-size:18px; font-weight:600;padding-top:10px">
        Customer Details
        </td>
                </tr>

                <tr>
                <td style="padding-top:10px">
          
                  <b style="width:240px;">Name: </b> '.$userInfo["fname"].' '.$userInfo['lname'].'<br/>
                  <b style="width:240px;">Email: </b> '.$userInfo['email'].'<br/>
                  <b style="width:240px;">Installation Address: </b> '.$address.','.$postalCode.'

                </td>
			  </tr>
			  
			<tr>
			  <td style="font-size:18px; font-weight:600;padding-top:10px;padding-bottom:10px;">
			  Boiler Questions
			  </td>
		    </tr>';	

			for($i=0; $i<count($productInformation);$i++){
				$txt.='	<tr >
				<td style="padding-top:5px">
				'.$productInformation[$i]["name"].' : '.$productInformation[$i]["category"].'
				</td>
			  </tr>';
			}


			'</table>
   		</td>
  	</tr>
 </table>';

		return $txt;
	}
	
	
	public function sendConfirmationUser($name,$logoUrl,$pwd,$type){
		$txt = '<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td>
			<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
			 	<tr>
			  		<td align="center" style="padding: 20px 0 20px 0;">
						<img src="'.$logoUrl.'" width="150" height="auto" style="display: block;" />
					</td>
			 	</tr>
				<tr>
				  <td align="center" style="font-size: 24px; line-height: 28px;font-weight: 600;">
				   New User Creation Direct Heating!
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 30px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
											
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    	
			                    <tr>
			                      <td class="sectionContent" valign="middle" align="left">
                                    <b style="width:240px;">Name:</b> '.$name.'<br/>
                                    <b style="width:240px;">Password: </b> '.$pwd.'<br/>
                                    <b style="width:240px;">Role: </b> '.$type.'<br/>
                                   

			                      </td>
			                    </tr>
	                  		</tbody>
                  			</table>
						  </td>
							
						</tr>
					</table>
				  </td>
				</tr>
				
				
			
				<tr>
					<td align="center" bgcolor="#e22c2b" style="padding: 20px 10px 10px 20px;color:#fff;">				
						<a href="mailto:hello@directheating.co.uk" style="color:#fff;text-decoration:none;">hello@directheating.co.uk</a>
						
					</td>
				</tr>
			</table>
   		</td>
  	</tr>
 </table>';

		return $txt;
	}
	
	
		public function bookingUpdate($boilerName,$boilerAbout,$boilerTitle,$boilerImage,$boilerPrice,$installationDate,$videoDate,$logoUrl,$finalPrice,$name,$title,$price,$image,$address,$postalCode){
		$txt = '<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td>
			<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
			 	<tr>
			  		<td align="center" style="padding: 20px 0 20px 0;">
						<img src="'.$logoUrl.'" width="150" height="auto" style="display: block;" />
					</td>
			 	</tr>
				<tr>
				  <td align="center" style="font-size: 24px; line-height: 28px;font-weight: 600;">
				   Below is your updated booking detail!
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 30px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="top">
								<img src="'.$boilerImage.'" width="120">
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">'.$boilerName.'</td>
	                    		</tr>
	                    		<tr>
	                    			<td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">'.$boilerTitle.'</td>
	                    		</tr>
			                    <tr>
			                      <td class="sectionContent" valign="middle" align="left">
			                        <b>Installation Date:</b>'.date_format(new DateTime($installationDate),'D m F Y').'<br/>
			                       
			                         <b style="width:240px;">Address: </b> '.$address.','.$postalCode.'
			                         
			                      </td>
			                    </tr>
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$boilerPrice.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 10px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="middle">
								<img src="'.$image.'" width="130">
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="260" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">'.$name.'</td>
	                    		</tr>
	                    		<tr>
	                    			<td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">'.$title.'</td>
	                    		</tr>			                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="top" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="top" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$price.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr style="display:block;border-bottom: 1px solid #cccccc;">
				  <td style="padding: 10px 0 10px 0;">
				   	<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="140" valign="middle">
								&nbsp;
							</td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>							
							<td width="240" valign="middle" align="left">
						   	<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:20px;font-weight:bold;padding-bottom: 15px">Total</td>
	                    		</tr>	                    				                    
	                  		</tbody>
                  			</table>
						  </td>
							<td style="font-size: 0; line-height: 0;" width="20">
								&nbsp;
							</td>
							<td width="140" valign="middle">
							<table border="0" cellpadding="0" cellspacing="0">
	                    	<tbody>
	                    		<tr>
	                    			<td valign="middle" align="left" style="font-size:18px;font-weight:bold;padding-bottom: 15px">Total Price</td>
	                    		</tr>
	                    		<tr>
			                      <td valign="middle" align="left" style="color:#f21d2e;font-size:18px;padding-bottom: 15px">Â£'.$finalPrice.'</td>
			                    </tr>
	                  		</tbody>
                  			</table>
							</td>
						</tr>
					</table>
				  </td>
				</tr>
				<tr>
				  <td align="center" style="font-size: 18px; line-height: 24px;font-weight: 600;padding: 20px 0 20px 0;">
				   Thank you for your order! your request has been submitted.<br/>
					We will contact you soon.
				  </td>
				</tr>
				<tr>
					<td align="center" bgcolor="#e22c2b" style="padding: 20px 10px 10px 20px;color:#fff;">				
						<a href="mailto:hello@directheating.co.uk" style="color:#fff;text-decoration:none;">hello@directheating.co.uk</a>
						
					</td>
				</tr>
			</table>
   		</td>
  	</tr>
 </table>';

		return $txt;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
