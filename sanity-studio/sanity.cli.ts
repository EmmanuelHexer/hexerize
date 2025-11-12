import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rk22x3lt',
    dataset: 'production'
  },
  deployment: {
    appId: 'vroh9dv862y5oie5zgbrue9o',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
