document
  .getElementById(`registerForm`)
  .addEventListener(`submit`, function (event) {
    event.preventDefault();

    let email = document.getElementById(`email`).value.trim();
    let password = document.getElementById(`password`).value.trim();
    let confirmPassword = document
      .getElementById(`confirmPassword`)
      .value.trim();

    if (!email || !password || !confirmPassword) {
      alert(` Vui lòng nhập đầy đủ thông tin!`);
      return;
    }

    if (password !== confirmPassword) {
      alert(` Mật khẩu xác nhận không khớp!`);
      return;
    }

    let users = JSON.parse(localStorage.getItem(`users`)) || [];

    let emailExists = users.some(function (user) {
      return user.email === email;
    });

    if (emailExists) {
      alert(`Email này đã được đăng ký!`);
      return;
    }

    users.push({ email: email, password: password });
    localStorage.setItem(`users`, JSON.stringify(users));

    alert(`Đăng ký thành công !`);
    document.getElementById(`registerForm`).reset();
  });
