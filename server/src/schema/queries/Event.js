import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { DatabaseError } from '../../errors';
import { EventType } from '../types';
import { Event } from '../../models';

const args = {
  designator: { type: new GraphQLNonNull(GraphQLID) },
};

const resolve = (parent, { designator }) => new Promise((res, rej) => {
  Event.findOne({ designator }).exec((err, event) => {
    if (err) {
      rej(err);
      return;
    }
    if (!event) {
      rej(new DatabaseError('None of the events respond to that designator'));
      return;
    }
    res(event);
  });
});

const query = {
  event: {
    type: EventType,
    args,
    resolve,
  },
};

export default query;
