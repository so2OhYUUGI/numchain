import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import gm from 'GameMaster'
import TenKeyBoard from 'components/TenKeyBoard'

const styles = theme => ({
	root: {
		width: 360,
		height: 640,
		backgroundColor: 'lightgray',
	},
	question: {
		fontSize: 180,
		textAlign: 'center',
	},
	formula: {
		margin: theme.spacing.unit * 3,
	},
	numbers: {
		marginLeft: theme.spacing.unit,
	},
	action: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: theme.spacing.unit * 3,
	},
})

class GameBoard extends Component {
	constructor(props){
		super(props)

		this.state = {
			question: gm.question,
			hand: [],
		}
	}

	handleClick = event => {
		const { hand } = this.state
		const { value } = event

		value > 0
			? hand.push(value * 1)
			: hand[hand.length - 1] *= -1

		if(gm.checkSum(hand)){
			if(gm.checkOverlap(hand) > -1) gm.progress = "result"
			gm.hands.push({hand})

			this.setState({ hand:[], question: gm.question }, this.tenKey.reset)
		}else{
			this.setState({ hand })
		}
	}

	handleGameOver = event => {
		gm.progress = "result"
	}

	render() {
		const { classes } = this.props
		const { hand, question } = this.state

		return (
			<div className={classes.root}>
				<div className={classes.question}>
					{question}
				</div>
				<Formula hand={hand} />
				<TenKeyBoard 
					onClick={this.handleClick}
					innerRef={node => this.tenKey = node}
				/>
				<div className={classes.action}>
					<div>
						TURN : {gm.hands.length}
					</div>
					<Button variant="outlined" onClick={this.handleGameOver}>
						GIVE UP
					</Button>
					</div>
			</div>
		);
	}
}

export default withStyles(styles)(GameBoard)

/////////////////////////////////////////////////////////////////
/// Formula
/////////////////////////////////////////////////////////////////
export const Formula = withStyles(styles)(props => {
	const { classes, hand = [] } = props

	return (
		<div className={classes.formula}>
			=
			{hand.map((currentValue, index) => (
				<Fragment key={index}>
					<span className={classes.numbers}>{currentValue > 0 ? (index !== 0 && '+') : '-'}</span>
					<span className={classes.numbers}>{Math.abs(currentValue)}</span>
				</Fragment>
			))}
		</div>
	)
})