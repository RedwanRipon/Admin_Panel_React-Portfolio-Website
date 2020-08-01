<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <link rel="stylesheet" href="{{asset('css/responsive.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">

</head>

<body>

<div class="container">
    <div class="row d-flex justify-content-center">
        <div class="col-md-6 text-center m-5">
            <div class="card">
                <div class="card-body">
                    <h3>Admin Login</h3>
                    <hr>
                    <input id="userName" class="form-control" type="text" placeholder="UserName"><br>
                    <input id="password" class="form-control" type="password" placeholder="Password"><br>
                    <button id="loginBtn" onclick="AdminLogin()" class="btn btn-primary btn-block">Login</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

    function AdminLogin() {

        var UserName = document.getElementById('userName').value;
        var Password = document.getElementById('password').value;

        var Xhttp = new XMLHttpRequest();
        Xhttp.onreadystatechange=function () {
            if(this.readyState==4 && this.status==200 ){
                if (this.responseText=="1"){
                    window.location.href='/';
                }else{
                    alert("Wrong UserName & Password");
                }
            }
        }
        Xhttp.open("GET","/onLogin/"+UserName+"/"+Password,true);
        Xhttp.send();
    }

</script>
</body>
</html>

