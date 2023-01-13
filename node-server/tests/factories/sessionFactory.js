import Keygrip from 'keygrip';
import { keys } from '../../credentials/keys';
import Buffer from 'safe-buffer';

const keygrip = new Keygrip([keys.cookieKey]);
const _Buffer = Buffer.Buffer;

export const sessionFactory = user => {
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };
  const session = _Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  const sig = keygrip.sign('session=' + session);

  return { session, sig };
};
