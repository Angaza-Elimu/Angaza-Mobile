import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';
import AccountType from './AccountType';

it(`renders correctly`, () => {
    const accountType = renderer.create(<'AccountType />').toJSON()

    expect(accountType).toMatchSnapshot();
}) 
w