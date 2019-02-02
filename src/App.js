import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import gm from 'GameMaster'
import GameTitle from 'components/GameTitle'
import GameBoard from 'components/GameBoard'
import ResultPaper from 'components/ResultPaper'

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		height: '100vh',
	},
})

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			progress: gm.progress,
		}
	}

	componentDidMount() {
		gm.addEventListener('progressChange', () => (this.setState({ progress: gm.progress })))
	} 

	render() {
		const { classes } = this.props
		const { progress } = this.state

		return (
			<div className={classes.root}>
				{(()=>{
					switch(progress){
						default: return <GameTitle />
						case 'playing': return <GameBoard />
						case 'result': return <ResultPaper />
					}
				})()}
			</div>
			)
	}
}

export default withStyles(styles)(App)
