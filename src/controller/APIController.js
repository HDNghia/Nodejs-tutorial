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
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}
let updateUser = async (req, res) => {
    let { firstName, lastName, email, id, address } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstName, lastName, email, address, id]);
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'ok',
        data: rows
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
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'oke',
        data: rows
    })

}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}