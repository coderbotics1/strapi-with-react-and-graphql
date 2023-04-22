import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


// Pages & layout imports
import Homepage from './pages/Homepage';
import ReviewDetails from './pages/ReviewDetails';
import Category from './pages/Category';
import SiteHeader from './components/SiteHeader';

// Apollo Client

const clients = new ApolloClient({
	uri: "http://localhost:1337/graphql",
	cache: new InMemoryCache()
})


function App() {
	return (
		<Router>
			<ApolloProvider client={clients}>
				<div className="App">
					<SiteHeader />
					<Switch>
						<Route exact path="/">
							<Homepage />
						</Route>
						<Route path="/details/:id">
							<ReviewDetails />
						</Route>
						<Route path="/category/:id">
							<Category />
						</Route>
					</Switch>
				</div>
			</ApolloProvider>
		</Router>
	);
}

export default App;
