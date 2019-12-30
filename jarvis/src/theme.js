import { createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import blue from '@material-ui/core/colors/blue';

const primary = blue[700];
const secondary = pink;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: primary 
		},
		secondary: pink,
	},
	components: {
		icon: {
			fontSize: '24px',
			color: primary
		},
		'finger': {
			cursor: 'pointer'
		}
	}
});

console.debug(theme);
export default theme;