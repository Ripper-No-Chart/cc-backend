import { NextFunction, Request, Response } from 'express';
import UsersModel from '../models/user.models';
import { BAD_REQUEST, INTERNAL_ERROR, SUCCESS } from '../../../constants/';

class UsersMiddleware {
  /**
   * Get phone and check if user exist
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async checkUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { phone } = req.body;
      const userExist = await UsersModel.findOne({ 'primary_data.phone': phone }); // Check if user exist
      if (userExist) {
        return res.status(BAD_REQUEST).json({ message: 'El usuario ya existe' });
      }
      next();
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Get Id by phone
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async getId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { phone } = req.body;
      const user = await UsersModel.findOne({ 'primary_data.phone': phone }); // Check if user exist      
      if (!user) {
        return res.status(BAD_REQUEST).json({ message: 'El usuario no existe' });
      }
      req._id! = user._id.toString();
      req.phone! = phone;
      next();
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }
}

export default new UsersMiddleware();
