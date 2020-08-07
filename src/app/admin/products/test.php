<?php
 
namespace App\Http\Controllers;
 
use App\User;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
 use Validator;
 use DB;
 use PHPMailer\PHPMailer;
use Stripe;
use App\Models\Mail;
use DateTime;
//$adminEmail = "sitetestings11@gmail.com";
class PassportController extends Controller
{


	function mailFunction($subject,$txt,$email){
		try{
			$mail = new PHPMailer\PHPMailer(); // create a n
			$mail->isSMTP();
			$mail->SMTPDebug  = 0; // debugging: 1 = errors and messages, 2 = messages only
			$mail->SMTPAuth   = true; // authentication enabled
			$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
			$mail->Host       = "smtp.gmail.com";
			$mail->AuthType = 'LOGIN';
			$mail->Port       = 587; // or 587
			$mail->IsHTML(true);
			$mail->Username = "hello@directheating.co.uk";
			$mail->Password = "%2FFhL%L";
			$mail->SetFrom("hello@directheating.co.uk", 'Direct Heating');
			$mail->Subject = $subject;
			$mail->Body    = $txt;
			$mail->AddAddress($email);
			$mail->Send();
		}catch (phpmailerException $e) {
			echo $e->errorMessage(); //Pretty error messages from PHPMailer
		  } catch (Exception $e) {
			echo $e->getMessage(); //Boring error messages from anything else!
		  }
	}


	

	
	
   

   

   public function uploadImage($filename,$tempFileName){
 	
	$pathset = base_path();
	$path = $pathset."/public/uploads/".$filename;
	move_uploaded_file($tempFileName,$path);
	return "sucess";
}
   public function updateProfileImage(Request $request){
	$host = $request->root();
	$filename = $_FILES["file"]["name"];
	$updatedImageUrl = $host."/uploads/".$filename;
	$id =  $request->get('id');
	$tempFileName = 	$_FILES['file']['tmp_name'];
	$users  = DB::select("SELECT * FROM users Where id = '".$id."'");
	$imageToDelete =  json_decode(json_encode($users),true);
	$delImagePath = $host."/uploads/".$imageToDelete[0]['image'];
	//unlink($delImagePath);
	$this->uploadImage($filename,$tempFileName);
	$updateProfile = DB::statement("UPDATE users SET image = '".$_FILES["file"]["name"]."' WHERE id = '".$id."'");
	return response()->json(['message'=>$updatedImageUrl], 200);
}

public function updateUser(Request $request,$id){
	$user = User::find($id);
	$firstName =  $request->get('name');
	$email =  $request->get('email');
	$type =  $request->get('type');
	$phone =  $request->get('phone');
	$website =  $request->get('website');
	// $lastName =  $request->get('last_name');
	// $country =  $request->get('country');
	// $namepros =  $request->get('id');
	// $phone =  $request->get('phone');

	// $ns =  $request->get('ns');
	
	$user->name = $firstName;
	$user->email = $email;
	$user->user_type = $type;
	$user->phone = $phone;
	$user->website = $website;
	// $user->last_name = $lastName;
	// $user->country_code = $country;
	// $user->namepros = $namepros;
	// $user->linkedin = $request->linkedin;
	// $user->phone = $phone;

	// $user->ns = $ns;
	$user->save();
  return response()->json(['message'=>'success'], 200);

}


public function randomNumber($n) { 
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $randomString = ''; 
  
    for ($i = 0; $i < $n; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $randomString .= $characters[$index]; 
    } 
  
    return $randomString; 
}

public function checkEmailExists(Request $request){ 
	$email =  $request->get('email');

	$emailData  = DB::select("SELECT * FROM users Where email = '".$email."' AND  status = 1 ORDER by id");
	$data =  json_decode(json_encode($emailData),true);

	if(count($data) > 0){
		$number = $this->randomNumber(255);
		$result = DB::select("SELECT * FROM users WHERE email = '" . $email . "' AND  status = 1
ORDER by id");
		$userData =  json_decode(json_encode($result),true);
		$verifed = DB::statement("INSERT INTO password_resets (email, token)
		VALUES ('" . $email . "','" .  $number . "');");

		$mail = new Mail();
        $host = $request->root();
        $linkExp = explode("server",$host)[0];
        $link =  $linkExp.'/reset-password/'.$number;
		$name =$data[0]['name'];
		$logoUrl = $host."/uploads/logo.png";
        $txt = $mail->forgotConfirmation($name,$link,$logoUrl);
		$subject = "Reset your Password!";
		$adminEmail = config('constants.email');
		$this->mailFunction( $subject,$txt,$email);
		return response()->json(['message' => "success"], 200);
	}else{
		return response()->json(['message' => "You are not registered with us."], 400);
	}
	
}
	public function confirmAccount($id){
		$status = 1;
		$query =  DB::statement("UPDATE users SET status = '".$status."' WHERE id = '".$id."'");
		return response()->json(['message' =>'success'], 200);
	}
	
	public function validateFogetToken(Request $request)
    {
       $token =  $request->get('token');
        $result = DB::select("SELECT * FROM password_resets WHERE token = '" . $token . "'
");
       if(count( $result)>0){
         return response()->json(['succes'=>'tokenVerified'], 200);
       }else{
           return response()->json(['error'=>'invalidToken'], 400);
       }
    }

      public function confirmPassword(Request $request)
    {
      $password =  bcrypt($request->get('password'));
      $token =  $request->get('token');
      $getData =  DB::select("SELECT * FROM password_resets WHERE token = '" . $token . "'");
     // $email =  $getData['email'];

      $converttedArr = json_decode(json_encode($getData),true);
      $email = $converttedArr[0]['email'];
      $updatePassword = DB::statement("UPDATE users SET password = '".$password."' WHERE email = '".$email."'");
       return response()->json(['success'=>'password updated'], 200);
	}
	
	

	
	public function adminLogin(Request $request){
		$host = $request->root();
		  $pathset = base_path();
		   if(Auth::attempt(['email' => request('email'), 'password' => request('password'),'status' =>2])){
			   $user = Auth::user();
			   $userData =  json_decode(json_encode($user),true);
			   $success['token'] =  $user->createToken('MyApp')->accessToken;
			   $userData['image'] = $host."/uploads/". $userData['image'];
			   return response()->json(['success' => $success,'userDetails'=>$userData], 200);
		   
			 
		   }
		   else{
			   return response()->json(['error'=>'Unauthorised'], 401);
		   }   
		 
		   
	   }

	   public function getListUsers(Request $request){
		//print_r(Request::root());
		 $host = $request->root();
		  $usersList =  DB::select("SELECT * from users");
		   $list =  json_decode(json_encode($usersList),true);
   
		   for($i=0; $i<count($list); $i++){
			 $list[$i]['image'] = $host."/uploads/". $list[$i]['image'];
   
		   }
			 return response()->json(['success'=>$list], 200);
	   }

	  

	   public function count(Request $request){
		   $domains = DB::select("SELECT * from questions");
		$comments =  DB::select("SELECT * from products");
		$users =  DB::select("SELECT * from bookings");
		//$posts =  DB::select("SELECT * from owned_domain");
		$domainDcde =  json_decode(json_encode($domains),true);
		//$ownedDcde =  json_decode(json_encode($posts),true);

		
		  $commentsData =  json_decode(json_encode($comments),true);
		  $usersData =  json_decode(json_encode($users),true);
		  //$postsData =  json_decode(json_encode($posts),true);
			return response()->json(['buyer'=>count($commentsData),'seller' =>count($domainDcde),'ads'=>count($usersData)], 200);
						 
	 }
	 public function deleteUser($id){
		$query =  DB::statement("DELETE FROM users where id=".$id);
	
		return response()->json(['success'=>'deleted'], 200);
	   }

	   public function changePostStatus(Request $request){
	       
	       $apiKey = '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';
	    	Stripe\Stripe::setApiKey($apiKey);
		    $card = $request->get('card_id');
			$id = $request->get('booking_id');
			$amount = $request->get('price');
			$query =  DB::statement("SELECT *  FROM user_details where booking_id=".$id);
			$details =  json_decode(json_encode($query),true)[0];
			$email = $details['email'];
			 try{
    			$charge = \Stripe\Charge::create([
    			    
                        'amount' => $amount*100, // $15.00 this time
                        'currency' => 'gbp',
                        'customer' => $card, // Previously stored, then retrieved
                        "receipt_email"=>$email
                    ]);
                    
            		   $updateCat = DB::statement("UPDATE bookings SET status = 1 WHERE id = '".$id."'");
            		    return response()->json(['success'=>'updated'], 200);
    			     }
			     catch(\Stripe\Exception\CardException $e) {
            return response()->json(['message' =>$e->getError()->message], 400);
           
        }
		 
		

	   }
	  

	public function validateUser($id){
		$query =  DB::select("SELECT * from users where email = '".$id."'");
		$encodeQuery =  json_decode(json_encode($query),true);

		if(count($encodeQuery) == 0){
			return response()->json(['success'=>'error'], 400);
		}else{
			return response()->json(['success'=>'success'], 200);
		}	
	}
	


   public function homeContent(Request $request){
	$contact = $request->get('contact');
	$header = $request->get('header');
	$upperHeader = $request->get('upperHeader');
	$about = $request->get('about');
	$how = $request->get('how');
	$fq1 = $request->get('fq1');
	$fq1Ans = $request->get('fq1Ans');
	$fq2 = $request->get('fq2');
	$fq2Ans = $request->get('fq2Ans');
	$fq3 = $request->get('fq3');
	$fq4 = $request->get('fq4');
	$fq3Ans = $request->get('fq3Ans');
	$fq4Ans = $request->get('fq4Ans');
	$signin = $request->get('signin');
	$choose = $request->get('choose');
	$submit = $request->get('submit');
	$dd1 = $request->get('dd1');
	$dd2 = $request->get('dd2');
	$dd3 = $request->get('dd3');
	$dd4 = $request->get('dd4');
	$dd5 = $request->get('dd5');
	$user = Cm::find(1);
	$user->contact = $contact;
	$user->header = $header;
	$user->upperHeader = $upperHeader;
	$user->about = $about;
	$user->how = $how;
	$user->fq1 = $fq1;
	$user->fq1Ans = $fq1Ans;
	$user->fq2 = $fq2;
	$user->fq2Ans = $fq2Ans;
	$user->fq3 = $fq3;
	$user->fq4 = $fq4;
	$user->fq3Ans = $fq3Ans;
	$user->fq4Ans = $fq4Ans;
	$user->signin = $signin;
	$user->choose = $choose;
	$user->dd1 = $dd1;
	$user->dd2 = $dd2;
	$user->dd3 = $dd3;
	$user->dd4 = $dd4;
	$user->dd5 = $dd5;
	$user->submit = $submit;
	$user->save();

   }
   public function getContent(Request $request){
	$getData =  DB::select("SELECT * FROM cms");
	return response()->json(['success'=>$getData], 200);
   
} 

   

public function changeUserPassword(Request $request){
   	$password = bcrypt($request->get('password'));
   	$id = $request->get('id');
   	$query =  DB::statement("UPDATE users SET password = '".$password."' WHERE id = '".$id."'");
 	return response()->json(['message'=>'success'], 200);
 }




   
/*=====only this code updates ====*/

public function updateHomeContent(Request $request){

	$phone =  $request->get('phone');
		$installationText =  $request->get('installationText');
		$paymentText =  $request->get('paymentText');
$videoText =  $request->get('videoText');


	$query =  DB::statement("UPDATE cms SET phone = '".$phone."',installationText = '".$installationText."',paymentText = '".$paymentText."',videoText = '".$videoText."' WHERE id = 1");
		return response()->json(['message' => 'success'], 200);

}
public function updateUserAdmin(Request $request){
    	$id =  $request->get('id');
	$user = User::find($id);

	$email =  $request->get('email');
	$ns =  $request->get('password');


	$user->email = $email;
	$user->password = bcrypt($ns);
	$user->save();
  return response()->json(['message'=>'success'], 200);

}



/*====new code starts here===*/
public function addQuestion(Request $request){
	$name =  $request->get('name');
	$order =  $request->get('order');
	$verifed = DB::statement("INSERT INTO questions (name, order_question)
	VALUES ('" . $name . "','" .  $order . "');");
	return response()->json(['success'=>'success'], 200);
   
 }


 public function getQuestions(Request $request){
	$getData =  DB::select("SELECT * FROM questions");
   return response()->json(['success'=>$getData], 200);
   
 }

 public function updateQuestion(Request $request,$id){
	$name =  $request->get('name');
	$order =  $request->get('order');
	$updateData =  DB::statement("UPDATE questions SET name = '". $name."',order_question='". $order."' WHERE id = '".$id."'");
	return response()->json(['success'=>'success'], 200);
   
 }

 public function deleteQuestion($id){
	$query =  DB::statement("DELETE FROM questions where id=".$id);
	return response()->json(['success'=>'deleted'], 200);
   }

   public function addCategory(Request $request){
	$name =  $request->get('name');
	$question =  $request->get('question');
	$price =  $request->get('price');
	if(count($_FILES) > 0){
		$filename = $_FILES["file"]["name"];
		$tempFileName = 	$_FILES['file']['tmp_name'];
		$this->uploadImage($filename,$tempFileName);
	}else{
		$filename = '';
	}
	
	$verifed = DB::statement("INSERT INTO categories (category, question_id,price,image)
	VALUES ('" . $name . "','" .  $question . "','" .  $price . "','" .  $filename . "');");
	return response()->json(['success'=>'success'], 200);
   }

	public function deleteCategory($id){
		$query =  DB::statement("DELETE FROM categories where id=".$id);
		return response()->json(['success'=>'deleted'], 200);
	}

	public function getCategories(Request $request){
		$host = $request->root();
		$query =  DB::select("SELECT categories.*,questions.name, questions.id as QuestionId FROM categories  INNER JOIN questions on questions.id = categories.question_id");
		$getData =  json_decode(json_encode($query),true);
		for($i=0; $i<count($getData); $i++){
			if($getData[$i]['image']){
				$getData[$i]['image'] = $host."/uploads/". $getData[$i]['image'];
			}
			
	
		  }
		return response()->json(['success'=>$getData], 200);
	   
	 }
	 
	 	public function updateCategory(Request $request,$id){
	 	    $category =  $request->get('name');
	 	     $question =  $request->get('question');
	 	      $price =  $request->get('price');
	 	      
	 	      if(count($_FILES) > 0){
	 	          $filename = $_FILES["file"]["name"];
        		$tempFileName = 	$_FILES['file']['tmp_name'];
        		$this->uploadImage($filename,$tempFileName);
        		$updateData =  DB::statement("UPDATE categories SET category = '". $category."',question_id='". $question."',price='". $price."',image='". $filename."' WHERE id = '".$id."'");
	 	      }else{
	 	          $updateData =  DB::statement("UPDATE categories SET category = '". $category."',question_id='". $question."',price='". $price."' WHERE id = '".$id."'");
	 	      }
    		
	 	    	
	    return response()->json(['success'=>'success'], 200);
	 	}
	 
	 
	 
	 public function addProduct(Request $request){
		$name =  stripcslashes($request->get('name'));
		$title =  stripcslashes($request->get('title'));
		$price =  stripcslashes($request->get('price'));
		//$type =  $request->get('type');
		$about = stripcslashes($request->get('about'));
		$filters = json_encode($request->get('filters'));
        $records=json_decode(json_decode($filters));
        
       
		
		$feature1 =  stripcslashes($request->get('feature1'));
		$feature2 =  stripcslashes($request->get('feature2'));
		$feature3 =  stripcslashes($request->get('feature3'));
		$feature4 =  stripcslashes($request->get('feature4'));
		$feature5 =  stripcslashes($request->get('feature5'));
		$feature6 =  stripcslashes($request->get('feature6'));
		$feature7 =  stripcslashes($request->get('feature7'));
		$feature8 =  stripcslashes($request->get('feature8'));
	
		$filename = $_FILES["file"]["name"];
		$tempFileName = 	$_FILES['file']['tmp_name'];
		$this->uploadImage($filename,$tempFileName);
		$verifed = DB::statement("INSERT INTO products (boiler_name, title,boiler_price,feature1,feature2,feature3,feature4,feature5,feature6,feature7,feature8,image,about)
		VALUES ('" . $name . "','" .  $title . "','" .  $price . "','" .  $feature1 . "','" .  $feature2 . "','" .  $feature3 . "','" .  $feature4 . "','" .  $feature5 . "','" .  $feature6 . "','" .  $feature7 . "','" .  $feature8 . "','" .  $filename . "','".  $about . "');");
        	$id =  DB::getPdo()->lastInsertId();
        for($i=0; $i<count($records); $i++){
            $boilerID = $id;
            $convert_commbi =  $records[$i]->type4;
            $curently_have =  $records[$i]->type3;
            $where_install =  $records[$i]->type5;
            $property =  $records[$i]->type6;
            $bedrooms =  $records[$i]->type7;
            $baths =  $records[$i]->type8;
            $showers =  $records[$i]->type9;
            $flue_exit = $records[$i]->type10;
            $type =  $records[$i]->type2;
            $verifed = DB::statement("INSERT INTO boiler_filters (convert_commbi,curently_have,where_install,property,bedrooms,baths,showers,flue_exit,type,boiler_id)
		VALUES ('".  $convert_commbi . "','".  $curently_have . "','".  $where_install . "','".  $property . "','".  $bedrooms . "','".  $baths . "','".  $showers . "','".  $flue_exit . "','".  $type . "','".  $boilerID . "');");
        }
        return response()->json(['success'=>'success'], 200);
	   }

	   
	public function getProducts(Request $request){
	    	$host = $request->root();
		$query =  DB::select("SELECT * FROM products");
		$getData =  json_decode(json_encode($query),true);
		for($i=0; $i<count($getData); $i++){
			if($getData[$i]['image']){
				$getData[$i]['image'] = $host."/uploads/". $getData[$i]['image'];
			}
			
	
		  }
	return response()->json(['success'=>$getData], 200);
	
    }
    public function getFilterRecords(Request $request,$id){
        $query =  DB::select("SELECT * FROM boiler_filters where boiler_id = '".$id."'");
		$getData =  json_decode(json_encode($query),true);
		
	return response()->json(['success'=>$getData], 200);
    }  


	public function deleteProduct($id){
		$query =  DB::statement("DELETE FROM products where id=".$id);
		return response()->json(['success'=>'deleted'], 200);
	}

	public function updateProduct(Request $request,$id){
			$name =  stripcslashes($request->get('name'));
		$title =  stripcslashes($request->get('title'));
		$price =  stripcslashes($request->get('price'));
		$type =  $request->get('type');
		$about = stripcslashes($request->get('about'));
		$feature1 =  stripcslashes($request->get('feature1'));
		$feature2 =  stripcslashes($request->get('feature2'));
		$feature3 =  stripcslashes($request->get('feature3'));
		$feature4 =  stripcslashes($request->get('feature4'));
		$feature5 =  stripcslashes($request->get('feature5'));
		$feature6 =  stripcslashes($request->get('feature6'));
		$feature7 =  stripcslashes($request->get('feature7'));
		$feature8 =  stripcslashes($request->get('feature8'));
	
		$convert_commbi =  $request->get('convert_commbi');
		$curently_have =  $request->get('curently_have');
		$where_install =  $request->get('where_install');
		$property =  $request->get('property');
		$bedrooms =  $request->get('bedrooms');
		$baths =  $request->get('baths');
		$showers =  $request->get('showers');
		$flue_exit =  $request->get('flue_exit');
	
	    if(count($_FILES) > 0){
	       $filename = $_FILES["file"]["name"];
		    $tempFileName = 	$_FILES['file']['tmp_name'];
	    	$this->uploadImage($filename,$tempFileName);
	    	$updateData =  DB::statement("UPDATE products SET boiler_name = '". $name."',title ='". $title."',boiler_price ='". $price."',feature1 ='". $feature1."',feature2 ='". $feature2."',feature3 ='". $feature3."',feature4 ='". $feature4."',feature5 ='". $feature5."',feature6 ='". $feature6."',feature7 ='". $feature7."',feature8 ='". $feature8."',image='". $filename."',about='". $about."', WHERE id = '".$id."'");  
	    }else{

		$updateData =  DB::statement("UPDATE products SET boiler_name = '". $name."',title ='". $title."',boiler_price ='". $price."',feature1 ='". $feature1."',feature2 ='". $feature2."',feature3 ='". $feature3."',feature4 ='". $feature4."',feature5 ='". $feature5."',feature6 ='". $feature6."',feature7 ='". $feature7."',feature8 ='". $feature8."',about='". $about."' WHERE id = '".$id."'");
		}	

		$filters = json_encode($request->get('filters'));
        $records=json_decode(json_decode($filters));
		for($i=0; $i<count($records); $i++){
           
			$convert_commbi =  $records[$i]->type4;
			$boilerID =  $records[0]->boiler_id;
            $curently_have =  $records[$i]->type3;
            $where_install =  $records[$i]->type5;
            $property =  $records[$i]->type6;
            $bedrooms =  $records[$i]->type7;
            $baths =  $records[$i]->type8;
            $showers =  $records[$i]->type9;
            $flue_exit = $records[$i]->type10;
			$type =  $records[$i]->type2;
			if(isset($records[$i]->id)){
				$id = $records[$i]->id;
				$updateData =  DB::statement("UPDATE boiler_filters SET type ='". $type."',convert_commbi='". $convert_commbi."',curently_have='". $curently_have."',where_install='". $where_install."',property='". $property."',bedrooms='". $bedrooms."',baths='". $baths."',flue_exit='". $flue_exit."',showers='". $showers."' WHERE id = '".$id."'");  
				
			}else{
				$verifed = DB::statement("INSERT INTO boiler_filters (convert_commbi,curently_have,where_install,property,bedrooms,baths,showers,flue_exit,type,boiler_id)
				VALUES ('".  $convert_commbi . "','".  $curently_have . "','".  $where_install . "','".  $property . "','".  $bedrooms . "','".  $baths . "','".  $showers . "','".  $flue_exit . "','".  $type . "','".  $boilerID . "');");
			}
           
        }
	   


		return response()->json(['success'=>'success'], 200);
	   
	 }

	 public function searchProducts(Request $request){
		$host = $request->root();
		$uname=json_encode($request->get('filterRecords'));
		$records=json_decode($uname);
		
		
		$type = '';
		$curently_have = '';
		$where_install = '';
		$property = '';
		$bedrooms = '';
		$baths = '';
		$showers = '';
		$flue_exit = '';
		$convert_commbi = '';

		for($i=0; $i<count($records); $i++){
			
			if($records[$i]->name == 'What kind of fuel does your boiler use?'){
				$type = $records[$i]->category;
			}
			if($records[$i]->name == 'What type of boiler do you currently have?'){
				$curently_have = $records[$i]->category;
			}
			if($records[$i]->name == 'Where would you like your new boiler installed?'){
				$where_install = $records[$i]->category;
			}
			if($records[$i]->name == 'What type of property do you have ?'){
				$property = $records[$i]->category;
			}
			if($records[$i]->name == 'How many bedrooms do you have ?'){
				$bedrooms = $records[$i]->category;
			}
			if($records[$i]->name == 'How many baths do you have ?'){
				$baths = $records[$i]->category;
			}
			if($records[$i]->name == 'How many showers do you have ?'){
				$showers = $records[$i]->category;
			}
			if($records[$i]->name == 'Where does your flue exit the property ?'){
				$flue_exit = $records[$i]->category;
			}
			if($records[$i]->name == 'Do you want to convert to a combi boiler?'){
				$convert_commbi = $records[$i]->category;
			}
			
		}
    
        //echo "SELECT products.* FROM boiler_filters INNER JOIN products on products.id = boiler_filters.boiler_id where boiler_filters.type ='".$type."'  AND  boiler_filters.curently_have = '".$curently_have."' AND  boiler_filters.where_install = '".$where_install."' AND  boiler_filters.property = '".$property."' AND  boiler_filters.bedrooms = '".$bedrooms."' AND  boiler_filters.baths = '".$baths."' AND  boiler_filters.showers = '".$showers."' AND  boiler_filters.flue_exit = '".$flue_exit."' AND  boiler_filters.convert_commbi = '".$convert_commbi."'";
		
		$query =  DB::select("SELECT products.* FROM boiler_filters INNER JOIN products on products.id = boiler_filters.boiler_id where boiler_filters.type ='".$type."'  AND  boiler_filters.curently_have = '".$curently_have."' AND  boiler_filters.where_install = '".$where_install."' AND  boiler_filters.property = '".$property."' AND  boiler_filters.bedrooms = '".$bedrooms."' AND  boiler_filters.baths = '".$baths."' AND  boiler_filters.showers = '".$showers."' AND  boiler_filters.flue_exit = '".$flue_exit."' AND  boiler_filters.convert_commbi = '".$convert_commbi."'");
		
		$getData =  json_decode(json_encode($query),true);
		for($i=0; $i<count($getData); $i++){
			if($getData[$i]['image']){
				$getData[$i]['image'] = $host."/uploads/". $getData[$i]['image'];
			}
			
	
		  }
		return response()->json(['success'=>$getData], 200);
	
	}

    public function confirmOrder(Request $request){
		$host = $request->root();
		$personal =  $request->get('personalInformation');
		$installationDate =  $request->get('installationDate');
		$videoDate = $request->get('videoDate');
		$postalCode = $request->get('postalCode')['postalCode'];
	    $address = $request->get('address');
		
		
		$productInformation = json_encode($request->get('productInformation'));
		
		if($address['isDifferentAddress'] || $personal['isDifferentAddress']){
			$address2 = $address['address2'];
			$address3 = $address['address3'];
			$city = $address['city'];
			$country = $address['country'];
		}else{
			$address2 = '';
			$address3 = '';
			$city =  '';
			$country = '';
		}
		
		if($personal['isDifferentAddress']){
			$addressPersonal = $personal['address1'];
			$address2Personal = $personal['address2'];
			$personalPostalCode = $personal['postalCode1'];
			$personalAddress3 = $personal['address3'];
			$personalcity = $personal['city'];
			$personalcountry = $personal['country'];
		}else{
			$addressPersonal = $personal['address'];
			$address2Personal = '';
			$personalPostalCode = $personal['postalCode'];
			$personalAddress3 = '';
			$personalcity = '';
			$personalcountry = '';
		}
		
		$status = 0;
		$product =  $request->get('product');
		$fname = $personal['fname'];
		$lname = $personal['lname'];
		$notes = $personal['notes'];
		$email = $personal['email'];
		$title = $personal['title'];
		$contact = $personal['contact'];
		//$personalAddress = $personal['address'];
		$boilerName = $product['boiler_name'];
		$boilerPrice = $product['price'];
		$finalPrice =  $request->get('finalPrice');
		$controls =  $request->get('controls');
		$controlsCpy =  json_encode($request->get('controls'),JSON_HEX_APOS );
		$boilerAbout = $product['about'];
		$boilerImage = $product['image'];
		$boilerTitle = $product['title'];
		$address1 = $address['address'];
		$addressInstall = $address['address'].' '.$address2.' '.$address3;
		$fullPostal = $address['postalCode'];
		$token = $request->get('token');
	//	$apiKey = 'sk_test_NWlb8mdvbCVl9KLmHx9GueS700V2TSlXLz';
		$apiKey = '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';
	    	Stripe\Stripe::setApiKey($apiKey);
	    try{
     
      $customer = \Stripe\Customer::create([
            'source' => $token,
            'email' => $email,
        ]);
        $card_id =  $customer->id;

    
// 		$charge =     Stripe\Charge::create ([
// 			"amount" => $finalPrice * 100,
// 			"currency" => "gbp",
// 			"source" => $token,
// 			"description" => "payment for boiler",
// 			"receipt_email"=>$email
// 		]);
    
			$bookingDetails = DB::statement("INSERT INTO bookings (boiler, booking_date,price,postal_code,video_date,status,address,full_postal,controls,boiler_price,card_id,image,email,address2,address3,city,country,questions_group)
		VALUES ('" . $boilerName . "','" .  $installationDate . "','" .  $finalPrice . "','" .  $postalCode . "','" .  $videoDate . "','" .  $status . "','" .  $address1 . "','" .  $fullPostal . "','" .  $controlsCpy . "','" .  $boilerPrice . "','" .  $card_id . "','" .  $boilerImage . "','" .  $email . "','" .  $address2 . "','" .  $address3 . "','" .  $city . "','" .  $country . "','" .  $productInformation . "');");
		$bookingID =  DB::getPdo()->lastInsertId();
		
		$userDetails = DB::statement("INSERT INTO user_details (first_name, last_name,booking_id,title,notes,email,contact,address,address2,postal_code,address3,city,country)
		VALUES ('" . $fname . "','" .  $lname . "','" .  $bookingID . "','" .  $title . "','" .  $notes . "','" .  $email . "','" .  $contact . "','" .  $addressPersonal . "','" .  $address2Personal . "','" .  $personalPostalCode. "','" .  $personalAddress3. "','" .  $personalcity. "','" .  $personalcountry. "');");
	
	    $host = $request->root();
		$logoUrl = $host."/uploads/logo.png";
	    $dt = new DateTime($installationDate);
        $installDate = $dt->format('Y-m-d');
        $product = json_decode(json_encode($request->get('productInformation')),true);
		
        
		$mail = new Mail();
		$txt = $mail->sendConfirmation($fname,$boilerName,$boilerAbout,$boilerTitle,$boilerImage,$boilerPrice,$installDate,$videoDate,$logoUrl,$finalPrice,$controls['name'],$controls['title'],$controls['price'],$controls['image'],$addressInstall,$fullPostal);
	    $txtAdmin = $mail->sendConfirmationAdmin($boilerName,$boilerAbout,$boilerTitle,$boilerImage,$boilerPrice,$installDate,$videoDate,$logoUrl,$finalPrice,$controls['name'],$controls['title'],$controls['price'],$controls['image'],$addressInstall,$fullPostal,$personal,$product);
		$subject = "Your Order Details";
		$subject1 = "New installation order - ".$fullPostal;
		$this->mailFunction( $subject,$txt,$email);	
		$this->mailFunction( $subject1,$txtAdmin,'hello@directheating.co.uk');	
	
		return response()->json(['success'=>'success'], 200);
		
    } catch(\Stripe\Exception\CardException $e) {
            return response()->json(['message' =>$e->getError()->message], 400);
           
        }
	
	}

	 public function bookings(Request $request){
		$host = $request->root();
	//	$availableLimits = 10;
		$query1 =  DB::select("SELECT * from video_limit_data");
		//$postalCode =  $request->get('postalCode');
		$availableLimits =  json_decode(json_encode($query1),true)[0]['video_limit'];
		$query =  DB::select("SELECT count(id) As totalBookings,video_date FROM bookings where  DATE(booking_date) >= CURRENT_DATE GROUP BY video_Date ");
		$getData =  json_decode(json_encode($query),true);
	
		return response()->json(['success'=>$getData,'availableLimits'=>$availableLimits], 200);
	
	}
	
    public function boilerBookings(Request $request){
		$host = $request->root();
		$postalCode =  $request->get('postalCode');
		$query1 =  DB::select("SELECT * FROM postal_codes INNER JOIN group_category on group_category.postal_category = postal_codes.category where code like  '%".$postalCode."%'");
		$query =  DB::select("SELECT count(id) As totalBookings,booking_date FROM `bookings` WHERE postal_code = '" . $postalCode ."' GROUP BY booking_date");
		$getData =  json_decode(json_encode($query),true);
		$availableLimits =  json_decode(json_encode($query1),true)[0];
	
		return response()->json(['success'=>$getData,'availableLimits'=>$availableLimits], 200);
	
	}
	


    public function bookingsForAdmin(Request $request){
		$host = $request->root();
		$type =  $request->get('type');
		$query =  DB::select("SELECT * FROM bookings");
		
		$getData =  json_decode(json_encode($query),true);
		
		return response()->json(['success'=>$getData], 200);
	
	}


  public function bookingDetails(Request $request,$id){
		$host = $request->root();
		$type =  $request->get('type');
		$query =  DB::select("SELECT * FROM user_details where booking_id = '".$id."'");
		$getData =  json_decode(json_encode($query),true);
	
		return response()->json(['success'=>$getData], 200);
	
	}


	public function deleteBooking($id){
		$query =  DB::statement("DELETE FROM bookings where id=".$id);
		return response()->json(['success'=>'deleted'], 200);
	}

public function validatePostalCode(Request $request){
     $type =  $request->get('postalCode');
		$query =  DB::select("SELECT * FROM postal_codes where code like  '%".$type."'");
		$getData =  json_decode(json_encode($query),true);
		
		if(count($getData) > 0){
		    return response()->json(['success'=>$getData], 200);
		}else{
		    
		    return response()->json(['error'=>'error'], 400);
		}
	
	
     
 }
 
  public function getPostalCodes(Request $request,$id){
		$host = $request->root();
		$type =  $request->get('type');
		$query1 =  DB::select("SELECT * FROM group_category where postal_category = '".$id."'");
		$query =  DB::select("SELECT * FROM postal_codes where category = '".$id."'");
		$getData =  json_decode(json_encode($query),true);
		$getData1 =  json_decode(json_encode($query1),true)[0];
	
		return response()->json(['success'=>$getData,'cate'=>$getData1], 200);
	
	}



 public function updateBookings(Request $request,$id){
     	$boooking =  $request->get('booking');
     		$price =  $request->get('price');
     	$updateData =  DB::statement("UPDATE group_category SET limit_bookings='". $boooking."',price='". $price."' WHERE postal_category = '".$id."'");
     		return response()->json(['success'=>'success'], 200);
 }


public function addControl(Request $request){
		$name =  stripcslashes($request->get('name'));
		$title =  stripcslashes($request->get('title'));
		$price =  stripcslashes($request->get('price'));
	//	$type =  $request->get('type');
		//$about = stripcslashes($request->get('about'));
		$feature1 =  stripcslashes($request->get('feature1'));
		$feature2 =  stripcslashes($request->get('feature2'));
		$feature3 =  stripcslashes($request->get('feature3'));
		$feature4 =  stripcslashes($request->get('feature4'));
		$feature5 =  stripcslashes($request->get('feature5'));
		$feature6 =  stripcslashes($request->get('feature6'));
		$feature7 =  stripcslashes($request->get('feature7'));
		$feature8 =  stripcslashes($request->get('feature8'));
	
		$filename = $_FILES["file"]["name"];
		$tempFileName = 	$_FILES['file']['tmp_name'];
		$this->uploadImage($filename,$tempFileName);
		$verifed = DB::statement("INSERT INTO controls (name, title,price,feature1,feature2,feature3,feature4,feature5,feature6,feature7,feature8,image)
		VALUES ('" . $name . "','" .  $title . "','" .  $price . "','" .  $feature1 . "','" .  $feature2 . "','" .  $feature3 . "','" .  $feature4 . "','" .  $feature5 . "','" .  $feature6 . "','" .  $feature7 . "','" .  $feature8 . "','" .  $filename . "');");
		return response()->json(['success'=>'success'], 200);
	   }

	   
	public function getControl(Request $request){
	    	$host = $request->root();
		$query =  DB::select("SELECT * FROM controls");
		$getData =  json_decode(json_encode($query),true);
		for($i=0; $i<count($getData); $i++){
			if($getData[$i]['image']){
				$getData[$i]['image'] = $host."/uploads/". $getData[$i]['image'];
			}
			
	
		  }
	return response()->json(['success'=>$getData], 200);
	
	}
	public function deleteControl($id){
		$query =  DB::statement("DELETE FROM controls where id=".$id);
		return response()->json(['success'=>'deleted'], 200);
	}

	public function updateControl(Request $request,$id){
			$name =  stripcslashes($request->get('name'));
		$title =  stripcslashes($request->get('title'));
		$price =  stripcslashes($request->get('price'));
	//	$type =  $request->get('type');
		//$about = stripcslashes($request->get('about'));
		$feature1 =  addslashes($request->get('feature1'));
		$feature2 =  addslashes($request->get('feature2'));
		$feature3 =  addslashes($request->get('feature3'));
		$feature4 =  addslashes($request->get('feature4'));
		$feature5 =  addslashes($request->get('feature5'));
		$feature6 =  addslashes($request->get('feature6'));
		$feature7 =  addslashes($request->get('feature7'));
		$feature8 =  addslashes($request->get('feature8'));
	
	
	    if(count($_FILES) > 0){
	       $filename = $_FILES["file"]["name"];
		    $tempFileName = 	$_FILES['file']['tmp_name'];
	    	$this->uploadImage($filename,$tempFileName);
	    	$updateData =  DB::statement("UPDATE controls SET name = '". $name."',title ='". $title."',price ='". $price."',feature1 ='". $feature1."',feature2 ='". $feature2."',feature3 ='". $feature3."',feature4 ='". $feature4."',feature5 ='". $feature5."',feature6 ='". $feature6."',feature7 ='". $feature7."',feature8 ='". $feature8."',image='". $filename."' WHERE id = '".$id."'");  
	    }else{

		$updateData =  DB::statement("UPDATE controls SET name = '". $name."',title ='". $title."',price ='". $price."',feature1 ='". $feature1."',feature2 ='". $feature2."',feature3 ='". $feature3."',feature4 ='". $feature4."',feature5 ='". $feature5."',feature6 ='". $feature6."',feature7 ='". $feature7."',feature8 ='". $feature8."' WHERE id = '".$id."'");
	    }
	   
		return response()->json(['success'=>'success'], 200);
	   
	 }


public function addBreakDown(Request $request){
	$name =  $request->get('name');

	$verifed = DB::statement("INSERT INTO breakdowns (name )
	VALUES ('" . $name . "');");
	return response()->json(['success'=>'success'], 200);
   
 }


 public function getBreakDowns(Request $request){
	$getData =  DB::select("SELECT * FROM breakdowns");
   return response()->json(['success'=>$getData], 200);
   
 }

 public function updateBreakDown(Request $request,$id){
	$name =  $request->get('name');
	$updateData =  DB::statement("UPDATE breakdowns SET name = '". $name."' WHERE id = '".$id."'");
	return response()->json(['success'=>'success'], 200);
   
 }

 public function deleteBreakDown($id){
	$query =  DB::statement("DELETE FROM breakdowns where id=".$id);
	return response()->json(['success'=>'deleted'], 200);
   }

 public function register(Request $request)
    {
        $password = $this->randomNumber(6);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
		//	'password' => 'required|min:6',
			'image'=>"default.jpg",
        ]);
        if ($validator->fails()) {
           return response()->json(['error'=>$validator->errors()], 401);            
       }
        $user = User::create([
            'name' => $request->name,
			'email' => $request->email,
			'image'=>"default.jpg",
			'password' => bcrypt($password),
			'type' => $request->type,
			'status' => 2,
        ]);
		$user->save();
		
		$mail = new Mail();
        $host = $request->root();
        $linkExp = explode("server",$host)[0];
		$name = $request->name;
		$logoUrl = $host."/uploads/logo.png";
        $txt = $mail->sendConfirmationUser($name,$logoUrl,$password,$request->type);
		$subject = "New Admin User!";
	//	$adminEmail = config('constants.email');
		$this->mailFunction( $subject,$txt,$request->email);
		
		

        return response()->json(['token' => 'success'], 200);
    }

    public function updateBooking(Request $request){
        	$boiler =  $request->get('boiler');
        	$bookingDate =  $request->get('booking_date');
            $boilerPrice = $request->get('boiler_price');
            $controls = $request->get('controls');
            $finalPrice = $request->get('price');
            $address = $request->get('address');
            $full_postal =  $request->get('full_postal');
            $videoDate =  $request->get('video_date');
            $image =  $request->get('image');
            $id =  $request->get('id');
            $email = $request->get('email');
            $updateData =  DB::statement("UPDATE bookings SET video_date = '".$videoDate."',booking_date='". $bookingDate."' WHERE id = '".$id."'");
             $host = $request->root();
	    	$logoUrl = $host."/uploads/logo.png";
        $mail = new Mail();
		$txt = $mail->bookingUpdate($boiler,'','',$image,$boilerPrice,$bookingDate,$videoDate,$logoUrl,$finalPrice,$controls['name'],$controls['title'],$controls['price'],$controls['image'],$address,$full_postal);
		$subject = "Booking Update";
		$this->mailFunction( $subject,$txt,$email);	
	
        
        
    }

		public function setLimitData(Request $request){
		$date = $request->get('date');
		$category = $request->get('category');
		$limit_booking = $request->get('limit_booking');

		$verifed = DB::statement("INSERT INTO custom_limit (limit_booking, category,date)
		VALUES ('" . $limit_booking . "','" .  $category . "','" .  $date . "');");
		return response()->json(['message' => 'success'], 200);
	} 
	
		public function customLimits(Request $request,$id){
	    	$updateData =    DB::select("Select * from custom_limit WHERE category = '".$id."'");
        	return response()->json(['success'=>$updateData], 200);
	} 
	
		public function customLimitsAdmin(Request $request){
	    	$updateData =    DB::select("Select * from custom_limit");
        	return response()->json(['success'=>$updateData], 200);
	} 
		public function customLimitsVideoAdmin(Request $request){
	    	$updateData =    DB::select("Select * from custom_video_limit");
        	return response()->json(['success'=>$updateData], 200);
	} 
	

    	public function updateLimit(Request $request,$id){
    	    	$date = $request->get('date');
		        $category = $request->get('category');
		        $limit_booking = $request->get('limit_booking');
    	    	$updateData =  DB::statement("UPDATE custom_limit SET date = '". $date."',category='". $category."',limit_booking='". $limit_booking."' WHERE id = '".$id."'");
    	    	return response()->json(['message' => 'success'], 200);
    	}
    	
    public function	deleteLimit(Request $request,$id){
        		$query =  DB::statement("DELETE FROM custom_limit where id=".$id);
	
		return response()->json(['success'=>'deleted'], 200);
    }
    
    public function getGroupCategories( Request $request){
        	$updateData =    DB::select("Select * from group_category");
        	return response()->json(['success'=>$updateData], 200);
        
        
    }
    
    	public function setLimitDataVideo(Request $request){
		$date = $request->get('date');
		$limit_booking = $request->get('limit_booking');

		$verifed = DB::statement("INSERT INTO custom_video_limit (booking_limit,date)
		VALUES ('" . $limit_booking . "','" .  $date . "');");
		return response()->json(['message' => 'success'], 200);
	} 
	
		public function updateLimitVideo(Request $request,$id){
    	    	$date = $request->get('date');

		        $limit_booking = $request->get('limit_booking');
    	    	$updateData =  DB::statement("UPDATE custom_video_limit SET date = '". $date."',booking_limit='". $limit_booking."' WHERE id = '".$id."'");
    	    	return response()->json(['message' => 'success'], 200);
    	}
    	public function	deleteLimitVideo(Request $request,$id){
        		$query =  DB::statement("DELETE FROM custom_video_limit where id=".$id);
	
		return response()->json(['success'=>'deleted'], 200);
    }
    
    		public function customLimitsVideo(Request $request){
	    	$updateData =    DB::select("Select * from custom_video_limit");
        	return response()->json(['success'=>$updateData], 200);
	} 


    	public function videoLimits(Request $request){
	    	$updateData =    DB::select("Select * from video_limit_data");
        	return response()->json(['success'=>$updateData], 200);
	} 
	
	
		public function videoLimitData(Request $request){
	     $limit_booking = $request->get('limit');
    	    	$updateData =  DB::statement("UPDATE video_limit SET  video_limit_data = '". $limit_booking."' WHERE id = 1");
    	    	return response()->json(['message' => 'success'], 200);
	} 


}

