import pool from '../configs/connectDB';
let getAllUsers = async (req, res) => {
    //http 
    // 401 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstNameNew, lastName, email, Address } = req.body;

    if (!firstNameNew || !lastName || !email || !Address) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }

    await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstNameNew, lastName, email, Address]);
    return res.status(200).json({
        message: 'ok'
    })
}
let updateUser = async (req, res) => {
    let { firstNameNew, lastName, email, id, Address } = req.body;
    if (!firstNameNew || !lastName || !email || !Address || !id) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstNameNew, lastName, email, Address, id]);
    return res.status(200).json({
        message: 'ok'
    })
}
let deleteUser = async (req, res) => {
    let deleteId = req.params.id;
    if (!deleteId) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }
    await pool.execute('DELETE FROM users WHERE id = ?', [deleteId])
    return res.status(200).json({
        message: 'ok'
    })

}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}