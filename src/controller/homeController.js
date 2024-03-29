import pool from '../configs/connectDB';
import multer from 'multer';


let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM users');
    let check = await pool.execute('SELECT * FROM users');
    console.log(check[0])

    return res.render('index.ejs', { dataUser: check[0], test: 'abc string test' })
}
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId])
    return res.send(JSON.stringify(user))
}
let createNewUser = async (req, res) => {
    let { firstNameNew, lastName, email, Address } = req.body;
    await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstNameNew, lastName, email, Address]);
    // quay lại trang home 
    return res.redirect('/');
}
let deleteUser = async (req, res) => {
    let userId = req.params.userId;
    console.log(userId)
    await pool.execute('DELETE FROM users WHERE id = ?', [userId])
    return res.redirect('/');
}
let getEditPage = async (req, res) => {
    let id = req.params.id
    let [user] = await pool.execute('select * from users where id= ?', [id])

    return res.render('update.ejs', { dataUser: user[0] });
}
let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, id, address } = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstName, lastName, email, address, id]);
    return res.redirect('/');
}
let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}
// const upload = multer().single('profile_pic');

// const uploadMutiple = multer().array('multiple_images', 3);

let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

}

let handleUploadMultipleFiles = async (req, res) => {
    console.log('check mutiple')
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log('>>> check file: ', files)
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}



module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
    getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
}
