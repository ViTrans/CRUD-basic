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
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

function handleEditCourse(id, callback) {
  let nameContent = document.querySelector(`.title-${id}`).textContent;
  let giatienContent = document.querySelector(`.giatien-${id}`).textContent;
  let name = document.querySelector('input[name="name"]');
  let giatien = document.querySelector('input[name="giatien"]');
  name.value = nameContent;
  giatien.value = giatienContent;

  if (handleEditCourse) {
    creatBtn = document.querySelector("#update");
    creatBtn.onclick = function () {
      option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          giatien: giatien.value,
        }),
      };
      fetch(courseApi + "/" + id, option)
        .then(function (response) {
          return response.json();
        })
        .then(callback);
    };
  }
}
function renderCourses(courses) {
  let listCourses = document.querySelector(".list-courses");
  let htmls = courses.map(function (course) {
    return `<tr class="course-item-${course.id}">
    <td scope="row">${course.id}</td>
    <td class="title-${course.id}">${course.name}</td>
    <td class="giatien-${course.id}">${course.giatien}</td>
    <td "><button onclick="deleteCourses(${course.id})" class="btn btn-danger">Delete</button> <button onclick="handleEditCourse(${course.id})"class="btn btn-success">Edit</button></td>
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
