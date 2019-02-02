import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

//import gm from 'GameMaster'

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap-reverse',
	},
	button: {
		width: 100,
		height: 100,
		fontSize: 64,
	},
})

class GameBoard extends Component {
	constructor(props){
		super(props)

		this.state = {
			buttons: [
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
				{ sign: false, disabled: false },
			]
		}
	}

	reset = () => {
		const { buttons } = this.state

		this.setState({ buttons: buttons.map(()=>({ sign: false, disabled: false } )) })
	}

	handleClick = event => {
		const { onClick } = this.props
		const { buttons } = this.state
		const value =  event.target.innerText || 0
		event.value = isNaN(value) ? -1 : value

		if(value > -1){
			const index = value - 1
			const isFirst = buttons.reduce((accumulator, currentValue) => accumulator && !currentValue.sign, true )

			buttons[index].sign = true
			buttons.map((currentValue, currentIndex) => {
				return currentValue.disabled = currentValue.sign && (currentIndex !== index || isFirst)
			})
			this.setState({ buttons })
		}
		typeof(onClick) === "function" &&	onClick(event)
	}

	render() {
		const { classes } = this.props
		const { buttons } = this.state

		return (
			<div className={classes.root}>
				{buttons.map((currentValue, index) => {
					return (
						<Button 
							key={index} 
							variant="outlined" 
							disabled={currentValue.disabled}
							className={classes.button} 
							onClick={this.handleClick}
						>
							{currentValue.disabled 
								? ''
								:　currentValue.sign ? '+/-' : index + 1}
						</Button>	
					)
				}, [])}
			</div>
		);
	}
}

export default withStyles(styles)(GameBoard)
