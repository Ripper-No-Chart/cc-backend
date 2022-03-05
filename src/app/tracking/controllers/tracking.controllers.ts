import { Request, Response } from 'express';
import TrackingModel, { TrackingInterface } from '../models/tracking.models';
import { SUCCESS, INTERNAL_ERROR, CREATED } from '../../../constants';
import moment from 'moment';

class TrackingController {
  /**
   * Create a tracking
   * @param req
   * @param res
   * @returns
   */
  public async create(req: Request, res: Response): Promise<Response | void> {
    try {
      const { latitude, longitude } = req.body;
      const _id = req._id;
      const tracking: TrackingInterface = new TrackingModel({
        user: _id,
        latitude,
        longitude,
        created_at: moment().format('x'),
      });
      await tracking.save(); // Save new tracking
      return res.status(CREATED).end();
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }

  /**
   * Get user tracking from begin and end of date
   * @param req
   * @param res
   * @returns
   */
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const { user, date } = req.body;
      const end_date = parseInt(moment(date).endOf('day').format('x'));
      const begin_date = parseInt(moment(date).startOf('day').format('x'));
      const result = await TrackingModel.find({ created_at: { $lte: end_date, $gte: begin_date }, user });
      return res.status(SUCCESS).json({ result });
    } catch (e) {
      return res.status(INTERNAL_ERROR).json({ error: (e as Error).message });
    }
  }
}

export default new TrackingController();
