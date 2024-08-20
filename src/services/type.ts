export type getUserParams = {
  reference: string,
}

export type getUserResult = {
  user_name: string,
  message: string
}

export type createUserParams = {
  name: string,
  email: string,
  password: string
} 

export type  createUserResult = {
  message: string
}