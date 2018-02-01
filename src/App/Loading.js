import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader';

const WIDTH = 940;
// const BANNER_HEIGHT = 304;
const ICON_SIZE = 128;

const loaderProps = {
	speed: 2,
	primaryColor: "#f3f3f3",
	secondaryColor: "#ecebeb",
};

export default function Loading( props ) {
	return <article className="AppDetails loading" onClick={ props.onClick }>
		{/*
		<div className="AppDetails-banner">
			<ContentLoader
				height={ BANNER_HEIGHT }
				width={ WIDTH }
				{ ...loaderProps }
			>
				<Rect x="0" y="0" radius="5" width={ WIDTH } height={ BANNER_HEIGHT } />
			</ContentLoader>
		</div>
		*/}

		<header>
			<ContentLoader
				height={ ICON_SIZE }
				width={ WIDTH }
				{ ...loaderProps }
			>
				<Rect x="0" y="0" height={ ICON_SIZE } width={ ICON_SIZE } />
				<Rect x={ ICON_SIZE + 18 } y={ 7 } height={ 28 } width={ 280 } />
				<Rect x={ ICON_SIZE + 18 } y={ 52.5 } height={ 20 } width={ 200 } />
				<Rect x={ WIDTH - 68 } y={ 0 } height={ 45 } width={ 68 } />
			</ContentLoader>
		</header>

		<nav className="AppDetails-subnav">
			<ContentLoader
				height={ 38 }
				width={ WIDTH }
				speed={2}
				{ ...loaderProps }
			>
				<Rect x="16" y="9" height="19" width="40" />
				<Rect x="90" y="9" height="19" width="55" />
			</ContentLoader>
		</nav>

		<div className="AppDetails-main">
			<ContentLoader
				height={ ICON_SIZE }
				width={ WIDTH }
				{ ...loaderProps }
			>
				<Rect x="0" y="20" radius="3" width="350" height="18" />
				<Rect x="0" y="50" radius="3" width="400" height="18" />
				<Rect x="0" y="80" radius="3" width="360" height="18" />
			</ContentLoader>
		</div>
	</article>;
}
