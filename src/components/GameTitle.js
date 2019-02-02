import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import gm from 'GameMaster'

const styles = theme => ({
	GameTitle: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		height: '100vh',
	},
	header: {
		marginBottom: theme.spacing.unit * 10,
		color: 'gray',
		textAlign: 'center',
	},
	title: {
		fontSize: 120,
	},
})

class GameTitle extends Component {
	handleClick = event => {
		gm.initialize()
		gm.progress = "playing"
	}

	render() {
		const { classes } = this.props

		return (
			<div className={classes.GameTitle}>
				<header className={classes.header}>
					<div className={classes.title}>
						ナンしり
					</div>
					<div>
						1から9までの数字をつかってしりとりをしよう
					</div>
				</header>
				<Button variant="outlined" onClick={this.handleClick}>
					START
				</Button>	
			</div>
		);
	}
}

export default withStyles(styles)(GameTitle);
