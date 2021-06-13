const link_server = "https://digital-signature-server.herokuapp.com";
const link_server_localhost = "http://localhost:5000";

function showPopupPayment() {
    $('#popup-payment').show();
}

function handleClearData() {
    $('#exampleInputName1').val("");
    $('#exampleInputEmail1').val("");
    $('#exampleInputPhone1').val("");
    $('#exampleInputAddress1').val("");
}

function hidePopupPayment() {
    handleClearData();
    $('#popup-payment').hide();
}

$(document).ready(function () {
    try {
        hidePopupPayment();
    } catch (err) {
    }
});

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function handleSubmit() {
    var name = $('#exampleInputName1').val() || "";
    var email = $('#exampleInputEmail1').val() || "";
    var phoneNumber = $('#exampleInputPhone1').val() || "";
    var address = $('#exampleInputAddress1').val() || "";
    if(name === "" || email === "" || phoneNumber === "" || address === "")
    {
        swal({
            title: "Thông báo",
            text: "Thông tin thanh toán không được để trống!",
            icon: "warning",
            button: "Ok",
        })
    }else{
        var params = {
            name,
            email,
            phoneNumber: `${phoneNumber}`,
            address,
        }
        postData(`${link_server}/bill/create`, params).then(function (response) {
            console.log("res data", response.data)
            swal({
                title: "Thông báo",
                text: "Đơn hàng của bàn đã được thanh toán thành công!",
                icon: "success",
                button: "Ok",
            }).then(() => {
                hidePopupPayment();
            });
        }).catch(function (error) {
            swal({
                title: "Thông báo",
                text: "Thanh toán thất bại!",
                icon: "error",
                button: "Ok",
            });
        });
    }
}
