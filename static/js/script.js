// ADD
$("form#addemployee").submit(function(e) {
    var url = $(this).attr('action');
    var roleselect = $('select[name="role"]').val().trim();
    var nameInput = $('input[name="name"]').val().trim();
    var ageInput = $('input[name="age"]').val().trim();
    var companynameInput = $('input[name="companyname"]').val().trim();
    var birthdateInput = $('input[name="birthdate"]').val().trim();
    console.log(url)
    if (roleselect && nameInput && ageInput && companynameInput && birthdateInput) {
        // Create Ajax Call
        $.ajax({
            url: url,
            data: {
                'role': roleselect,
                'name': nameInput,
                'age': ageInput,
                'companyname': companynameInput,
                'birthdate': birthdateInput,
            },
            dataType: 'json',
            success: function (data) {
                if (data.employee) {
                  appendToUsrTable(data.employee);
                }
            }
        });
      }
    else {
        alert("All fields must have a valid value.");
        }
    $('form#addemployee').trigger("reset");
    return false;
});
function appendToUsrTable(employee) {
  $("#employeeTable > tbody:last-child").append(`
            <tr id="employee-${employee.id}">
                <td class="employeerole" name="role">${employee.role}</td>
                <td class="employeename" name="name">${employee.name}</td>
                <td class="employeeage" name="age">${employee.age}</td>
                <td class="employeecompanyname" name="companyname">${employee.companyname}</td>
                <td class="employeebirthdate" name="school">${employee.birthdate}</td>
                <td align="center">
                    <button class="btn btn-success form-control" onClick="editemployee(${employee.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
                </td>
                <td align="center">
                    <button class="btn btn-danger form-control" onClick="deleteemployee(${employee.id})">DELETE</button>
                </td>
        </tr>
    `);
}


// UPDATE
$("#update_sbt").click(function(e) {
    e.preventDefault();
    var idInput = $('input[name="formId"]').val().trim();
    var url = $('#form-id').attr('data-action');
    var roleselect = $('select[name="formrole"]').val().trim();
    var nameInput = $('input[name="formname"]').val().trim();
    var ageInput = $('input[name="formage"]').val().trim();
    var companynameInput = $('input[name="formcompanyname"]').val().trim();
    var birthdateInput = $('input[name="formbirthdate"]').val().trim();
    console.log(idInput, roleselect,nameInput,ageInput, companynameInput, birthdateInput, url )
    if (roleselect && nameInput && ageInput && companynameInput && birthdateInput) {
    console.log("sdfhbgsdhfghsdjkf")
        // Create Ajax Call
        $.ajax({
            url: url,
            data: {
                'id': idInput,
                'role': roleselect,
                'name': nameInput,
                'age': ageInput,
                'companyname': companynameInput,
                'birthdate': birthdateInput,
            },
            dataType: 'json',
            success: function (data) {
                if (data.employee) {
                  update_to_employee_Table(data.employee);
                }
            console.log(data);
            }
        });
       } else {
        alert("All fields must have a valid value.");
    }
    $('form#updateemployee').trigger("reset");
    $('#myModal').modal('hide');
    return false;
});

// Update Django Ajax Call
function editemployee(id) {
  if (id) {
    tr_id = "#employee-" + id;
    role = $(tr_id).find(".employeerole").text();
        $("#role-select-box").val(role).trigger('change');
    name = $(tr_id).find(".employeename").text();
    age = $(tr_id).find(".employeeage").text();
    companyname = $(tr_id).find(".employeecompanyname").text();
    birthdate = $(tr_id).find(".employeebirthdate").text();
    $('#form-id').val(id);
    $('#form-role').val(role);
    $('#form-name').val(name);
    $('#form-age').val(age);
    $('#form-companyname').val(companyname);
    $('#form-birthdate').val(birthdate);
  }
}
function update_to_employee_Table(employee){

    $("#employeeTable #employee-" + employee.id).children(".employeeData").each(function() {
        var attr = $(this).attr("name");
        if (attr == "role") {
          $(this).text(employee.role);
        } else if (attr == "name") {
          $(this).text(employee.name);
        } else if (attr == "age") {
          $(this).text(employee.age);
        } else if (attr == "companyname") {
          $(this).text(employee.companyname);
        } else {
          $(this).text(employee.birthdate);
        }
      });
}


// DELETE
function deleteemployee(id) {
  var action = confirm("Are you sure you want to delete this employee?");
  var url = $('#form-delete').attr('data-action');

  if (action != false) {
    $.ajax({
        url: url,
        data: {
            'id': id,
        },
        dataType: 'json',
        success: function (data) {
            if (data.deleted) {
              $("#employeeTable #employee-" + id).remove();
            }
        }
    });
  }
}
