<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Silas Pro',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGrWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNy0xOVQxOTowMCsxMDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMS0wNlQxNToxOTowNysxMDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDEtMDZUMTU6MTk6MDcrMTA6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODNmM2QyMTQtMmJhMC0zMjRhLWI3OTEtMDAzMDhhZTBmNDNmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6Y2JkNmFmODgtMTNiNy1kZjQ3LWFjYTktYTA1NmRkYWFmZGMyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmM4ODU4MjctOGE5NC0xNzQ5LWIxMGMtMDMwNTFmMWQzZjAxIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYzg4NTgyNy04YTk0LTE3NDktYjEwYy0wMzA1MWYxZDNmMDEiIHN0RXZ0OndoZW49IjIwMTgtMDctMTlUMTk6MDArMTA6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwOGMxOGJhLTA2MjgtN2U0OS1iMzkwLTMwOGRmMDhkYmY0NSIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xOVQxOTowMCsxMDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODNmM2QyMTQtMmJhMC0zMjRhLWI3OTEtMDAzMDhhZTBmNDNmIiBzdEV2dDp3aGVuPSIyMDE5LTAxLTA2VDE1OjE5OjA3KzEwOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkOhW6IAAAJtSURBVFjD3dhLiI1RHADws5BCihQLJXkTFiLDNFKGsrBWygILG8LIIxtWMiGSZxJ5JMnOQhYeE6KI8shk5ZnXCOOV5GfhTL7G7c6933yf7ufUt7n3/M///M7533vOvQGPMQehoM9itAZ8wKICQzbhWcBzbCgwZC8eBLRiZ4Ehp3E94CZOFBhyCWcDzsenqJA7OBxwPO5KUSGP0BywAw9TDNCAoRlOaAympYh7gaaA9XiaYoBruJLxyp5OEfcOC0I8Q96mGGARfqB3BoihfrfGKuP6x3NwVsBcvEffKgfpiW/xZM3iUGtLETcCnzAhYEhcjZ84gvoqBrqAlgwgD3Gsiv6zcSrOux29k7J9eONPu4qlXezUwrgrvbpZVj8xs0yfAViFW4n5vcA2DEYoFdQPy3EjEfQEuzCxU98e+NzN8tqI1yVen4qDeBnn8AOXsQR9OvevJNEMHE3s1hecw/z4/sl4uqaF3MXWxE32Er4nVv0ApnQ1TrVJB2EtbsdEbbFG32BgCsRYfI3fmu1x1a9jWayMisfq7od0HnbjY4RdiefS+DIxk2M53Ywxr2KtN3ZnLlkdZjv83Z5gTyzNRhxK1HuyrctiDllBZkrfxtUSpOOKUW27mlX+LCHbU0DW1iJkRgrI2FqEdPxsrrRleXPOHFJNea2pZUhDFZDRtQzpuMl21VqyzpsHZGsFkNVFgNRXABlVBEjAgzKIy3nkzAvSXAbSVCTI9DKQkUWCBNwvgbiYV748IVtKQFYWETKtBGR4ESEB9xKIC3nmyhuyOQFZUWRIXQIyrMiQEP8leZR3nn8BOYP9/wOkDpPyzvMLDphwAHNEbf0AAAAASUVORK5CYII='
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
