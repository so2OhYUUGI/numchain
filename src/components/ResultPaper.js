import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

import gm from 'GameMaster'
import { Formula } from 'components/GameBoard'

const styles = theme => ({
	root: {
		width: 360,
		height: 640,
		backgroundColor: 'lightgray',
		textAlign: 'center',
		overflow: 'scroll',
	},
	attention: {
		color: 'white',
		backgroundColor: 'yellow',
	}
})

class ResultPaper extends Component {
	handleClick = event => {
		gm.initialize()
		gm.progress = "playing"
	}

	render() {
		const { classes } = this.props
		const overlappedIndex = gm.checkOverlap()

		return (
			<div className={classes.root}>
			 <Table padding="dense">
				<TableHead>
					<TableRow>
						<TableCell>TURN</TableCell>
						<TableCell align="center">HAND</TableCell>
						<TableCell align="right">TIME</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{gm.hands.map((currentValue, index) => (
						<TableRow key={index} className={overlappedIndex === index ? classes.attention : ""}>
							<TableCell component="th" scope="row">
								{index}
							</TableCell>
							<TableCell><Formula hand={currentValue.hand} /></TableCell>
							<TableCell align="right">{0}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>    
			 <Button variant="outlined" onClick={this.handleClick}>
					NEW GAME
				</Button>	
			</div>
		)
	}
}

export default withStyles(styles)(ResultPaper)
