import { Request, Response } from "express";
import User from "../models/user";



export const getUsers = async( req: Request, res: Response ) => {

    const users = await User.findAll()

    res.json({users})
}

export const getUser = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( !user ) {
        res.status(404).json({
            msg: `No exist user ${ id }`
        })
    } else {
        res.json({
            user
        })
    }

}

export const postUser = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const existemail = await User.findOne({
            where: {
                email: body.email
            }
        })

        if ( existemail ){
            return res.status(400).json({
                msg: 'Exist email ' + body.email
            });
        }
        
        const user = User.build(body);

        await user.save();

        res.json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin',
        })
    }

}

export const putUser = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status(404).json({
                msg: 'No exist user id ' + id
            });
        } 
        
        await user.update( body );

        res.json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin',
        })
    }
}

export const deleteUser = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status(404).json({
                msg: 'No exist user id ' + id
            });
        } 

        await user.update({ estado: false });

        res.json(user)
        // await user.destroy();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin',
        })
    }
}
