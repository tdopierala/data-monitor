<template>
	<v-app>
		<v-app-bar title="Data Monitor App"></v-app-bar>

		<v-navigation-drawer>
			<nav>
				<v-list>
					<v-list-item>
						<router-link to="/">Home</router-link>
					</v-list-item>
					<v-list-item>
						<router-link to="/about">About</router-link>
					</v-list-item>
				</v-list>
			</nav>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>
