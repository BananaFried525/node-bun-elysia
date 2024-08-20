import { InternalServerError } from 'elysia'
import * as types from './type'
import db from '../db'
import * as utils from '../utils'

export const getUser = async ({ reference }: types.getUserParams): Promise<types.getUserResult> => {
  try {
    const user = await db.user.findFirst({
      where: {
        reference: reference,
      },
    })

    if (!user) {
      return {
        user_name: "",
        message: "not_found"
      }
    }

    return {
      user_name: user.userName,
      message: "message"
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    throw new InternalServerError()
  }
}

export const createUser = async ({ name, email, password }: types.createUserParams): Promise<types.createUserResult> => {
  try {
    const user = await db.$transaction([
      db.user.create({
        data: {
          userName: name,
          reference: utils.getReference(),
          email: email,
          password: password,
        }
      }) 
    ])
    
    return {
      message: "success"
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    throw new InternalServerError()
  }
}