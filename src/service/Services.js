import axios from "axios";
import swal from 'sweetalert';

const user_data = JSON.parse(localStorage.getItem('user'))

const Services = {
    showResponseOK: function (message, type = "success") {
        swal({
            title: "Response",
            text: message,
            icon: type,
            button: "OK",
            closeOnClickOutside: false,
        });
    },
    sendFriendRequest: function (user_id) {
        const data = {
            user_id1: user_data.id,
            user_id2: user_id
        }

        axios.get('sanctum/csrf-cookie').then(() => {
            axios.post('api/send_friend_request', data).then((response) => {
                if (response.data.status === 200) {
                    this.showResponseOK(response.data.message, "success")
                }
            }).catch((err) => {
                console.log('Error: ' + err);
            })
        })
    },
    cancelFriendRequest: function () {
        return swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    },
}

export default Services;