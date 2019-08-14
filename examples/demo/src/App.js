import React, { Component } from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';

import './App.css';

import authProvider from './authProvider';
import sagas from './sagas';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
// import englishMessages from './i18n/en';
import chineseMessages from './i18n/cn';
import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';
// import { CommandsList } from './Commands/Commands';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';

const i18nProvider = locale => {
    if (locale === 'en') {
        return import('./i18n/en').then(messages => messages.default);
    }
    // 总是返回中文
    return chineseMessages;
};

class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        this.restoreFetch = await fakeServerFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        const dataProvider = await dataProviderFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        this.setState({ dataProvider });
    }

    componentWillUnmount() {
        this.restoreFetch();
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">数据加载中...</div>
                </div>
            );
        }

        return (
            <Admin
                title="润歌经营管理系统"
                dataProvider={dataProvider}
                // dataProvider={strapiDataProvider(strapi)}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                locale="cn"
                i18nProvider={i18nProvider}
            >
                {/* <Resource name="commands" list={CommandsList} /> */}
                <Resource name="customers" {...visitors} />
                <Resource
                    name="commands"
                    {...orders}
                    options={{ label: 'Orders' }}
                />
                <Resource name="invoices" {...invoices} />
                <Resource name="products" {...products} />
                <Resource name="categories" {...categories} />
                <Resource name="reviews" {...reviews} />
            </Admin>
        );
    }
}

export default App;
