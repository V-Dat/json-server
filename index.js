var users = [{ id: 1, name: 'Kien Dam', }, { id: 2, name: 'Son Dang', }, { id: 3, name: 'Duc Hao', },]

var comments = [
                { id: 1, user_id: 1, content: 'sentance 1', },
                { id: 2, user_id: 2, content: 'sentance 2', },
                { id: 3, user_id: 1, content: 'sentance 3', },
                { id: 4, user_id: 2, content: 'sentance 4', }]

// function getComments() {
//     return new Promise(function (resolve) {
//         resolve(comments)
//     }
//     )
// }

// getComments()
//     .then(

//         function (comments) {
//             var commennts_list_ids = comments.map(function (e) { return e.user_id }
//             );
//             return getIdByCommennts_list_ids(commennts_list_ids);}
//         )

//         .then(function (commennts_list_ids) {return commennts_list_ids.forEach(function(e){
//                 return {
//                     users: users,
//                     comments: comments,}
//             })
//         })





//             /// tạo ra 1 function(có tham số là một mảng ở trên ) => trả ra những cái trùng với 


// function getIdByCommennts_list_ids(commennts_list_ids) {
//             return new Promise(function (resolve) {
//                 var Users_list_ids = user.filter(function (e) { return e.id.includes(commennts_list_ids) })
//                 resolve(Users_list_ids)
//             })
//         }




// Fake API

function getComments() {
    return new Promise(function (resolve) {

        resolve(comments)

    })
}

function getUsersByIds(userIds) {

    return new Promise(function (resolve) {
        var result = users.filter(function (user) { // từ list user_Id thì lấy ra list user có id tương ứng
            return userIds.includes(user.id)
        })

        resolve(result)// resolve result là để result có thể lọt và thành công khi ta .then ở dưới

    })
}

getComments()
    .then(function (comments) {
        var userIds = comments.map(function (comment) { // lấy ra 1 list user_Id
            return comment.user_id;
        });

        return getUsersByIds(userIds)

            .then(function (users) {
                return {
                    users: users,
                    comments: comments,
                }; // trả về 1 object có chứa 2 array
            });
    })
    /// Để hiện thị ra một cái comment hoàn chỉnh thì ta phải nối user.name: vs commen.content
    // trước hết la phải lấy ra được comment ở trong array comments được trả về ở trê thì dùng vòng lặp lặp qua
    // từ comment thì ta có thể lấy ra được user tương ứng ở array user được return ở trên
    //xong ta dùng innerHTML để add 1 element vào ul là được
    .then(function (data) {
        var commentBlock = document.getElementById('comment-block');
        var html = '';
        data.comments.forEach(comment => {
            var user = data.users.find(function (user) {
                return user.id === comment.user_id
            })
            html += `<li>${user.name}: ${comment.content}</li>`
        });
        commentBlock.innerHTML = html
    });

