import { Request, Response } from 'express';
import UsersModel, { UserInterface } from '../models/user.models';
import { SUCCESS, INTERNAL_ERROR, CREATED } from '../../../constants';

class UserController {
  /**
   * Create a single user
   * @param req
   * @param res
   * @returns
   */
  public async createUser(req: Request, res: Response): Promise<Response | void> {
    try {
      const { primary_data } = req.body;
      const user: UserInterface = new UsersModel({
        primary_data,
      });
      await user.save(); // Save new user
      return res.status(CREATED).end();
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Edit user
   * @param req
   * @param res
   * @returns
   */
  public async editUser(req: Request, res: Response): Promise<Response> {
    try {
      const { primary_data } = req.body;
      const _id = req._id;
      await UsersModel.updateOne({ _id }, { $set: { primary_data } });
      return res.status(SUCCESS).json({ message: 'Usuario editado' });
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Get all users list
   * @param req
   * @param res
   * @returns
   */
  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const result = await UsersModel.find({});
      return res.status(SUCCESS).json({ result });
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Get single user
   * @param req
   * @param res
   * @returns
   */
  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const result = (await UsersModel.find({ _id: req.body })).pop();
      return res.status(SUCCESS).json({ result });
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Delete single user
   * @param req
   * @param res
   * @returns
   */
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const _id = req._id;
      await UsersModel.findByIdAndDelete(_id);
      return res.status(SUCCESS).json({ message: 'Usuario eliminado' });
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }
}

export default new UserController();
