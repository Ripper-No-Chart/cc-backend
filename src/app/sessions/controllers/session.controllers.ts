import { Request, Response } from 'express';
import SessionModel, { SessionInterface } from '../models/session.models';
import { SUCCESS, INTERNAL_ERROR, CREATED } from '../../../constants/';
import moment from 'moment';

class SessionController {
  /**
   * Save start and finish session
   * @param req
   * @param res
   * @returns
   */
  public async save(req: Request, res: Response): Promise<Response | void> {
    try {
      const { action } = req.body;
      const _id = req._id;
      const session: SessionInterface = new SessionModel({
        user: _id,
        action,
        created_at: moment().format('x'),
      });
      await session.save(); // Save new session
      return res.status(CREATED).end();
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Get user sessions from begin and end of date
   * @param req
   * @param res
   * @returns
   */
  public async get(req: Request, res: Response): Promise<Response | void> {
    try {
      const { user, date } = req.body;
      // Get current date and add milliseconds
      const end_date = parseInt(moment(date).endOf('day').format('x'));
      const begin_date = parseInt(moment(date).startOf('day').format('x'));
      const sessions = await SessionModel.find({ created_at: { $lte: end_date, $gte: begin_date }, user });
      return res.status(SUCCESS).json({ sessions });
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }
}

export default new SessionController();
