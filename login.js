function initLoginForm() {
  let form = document.getElementById(`loginForm`);
  let toggle = document.getElementById(`togglePassword`);
  let passwordInput = document.getElementById(`password`);

  toggle.addEventListener(`click`, function () {
    if (passwordInput.type === `password`) {
      passwordInput.type = `text`;
    } else {
      passwordInput.type = `password`;
    }
  });
  form.addEventListener(`submit`, function (event) {
    event.preventDefault();

    let email = document.getElementById(`email`).value.trim();
    let password = document.getElementById(`password`).value.trim();

    if (!email || !password) {
      alert(` Vui lòng nhập email và mật khẩu!`);
      return;
    }

    let users = JSON.parse(localStorage.getItem(`users`)) || [];
    let matchedUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });
    if (matchedUser) {
      alert(`Đăng nhập thành công!`);
      window.location.href = `home.html`;
    } else {
      alert(`Sai email hoặc mật khẩu!`);
    }
  });
}

initLoginForm();
