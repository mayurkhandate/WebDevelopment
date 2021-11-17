document.getElementById('dashboard').style.display = "none"

document.getElementById('checkoutButton').style.display = "none"

document.getElementById('googleSignIn').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

function GoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider()

    console.log('Login Btn Call')
    firebase.auth().signInWithPopup(provider).then(res => {
        console.log(res.user)
        document.getElementById('LoginScreen').style.display = "none"
        document.getElementById('dashboard').style.display = "block"
        document.getElementById('checkoutButton').style.display = "block"

        showUserDetails(res.user)

        window.location.replace("./index.html")

    }).catch(e => {
        console.log(e)
    })
}

function showUserDetails(user) {
    document.getElementById('userDetails').innerHTML = `
            <div class="text-center">
                <img class="rounded-circle mb-4" src="${user.photoURL}" style="width:25%">
                <p>Name : ${user.displayName}</p>
                <p>Email : ${user.email}</p>
          </div>
        `
}

function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById('LoginScreen').style.display = "none"
            document.getElementById('dashboard').style.display = "block"
            document.getElementById('checkoutButton').style.display = "block"

            showUserDetails(user)
        } else {

        }
    })
}

function LogoutUser() {
    console.log('Logout Btn Call')
    firebase.auth().signOut().then(() => {
        document.getElementById('LoginScreen').style.display = "block"
        document.getElementById('dashboard').style.display = "none"
        document.getElementById('checkoutButton').style.display = "none"
    }).catch(e => {
        console.log(e)
    })
}
checkAuthState()