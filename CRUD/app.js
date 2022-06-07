// var coursesApi = "http://localhost:3000/courses";
// fetch(coursesApi)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (courses) {
//     console.log(courses);
//   });
let courseApi = "http://localhost:3000/courses";
function start() {
  getCourses(renderCourses);
  handleCreateForm();
}
start();

function getCourses(callback) {
  fetch(courseApi).then(function (response) {
    return response.json().then(callback);
  });
}
function creatCourse(data, callback) {
  fetch(courseApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(function (response) {
    return response.json();
  });
}
function deleteCourses(id) {
  fetch(courseApi + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
}

function handleEditCourse(id) {}
function renderCourses(courses) {
  let listCourses = document.querySelector(".list-courses");
  let htmls = courses.map(function (course) {
    return `<tr>
    <td scope="row">${course.id}</td>
    <td>${course.name}</td>
    <td>${course.giatien} <button onclick="deleteCourses(${course.id})" class="btn btn-danger">Xoa</button> <button onclick="handleEditCourse(${course.id})" class="btn btn-success">sua</button></td>
  </tr>`;
  });
  listCourses.innerHTML = htmls.join("");
}
function handleCreateForm() {
  let creatBtn = document.querySelector(".create");
  creatBtn.onclick = function () {
    let name = document.querySelector('input[name="name"]').value;
    let giatien = document.querySelector('input[name="giatien"]').value;
    let formData = {
      name: name,
      giatien: giatien,
    };
    creatCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}
