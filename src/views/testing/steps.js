export default function getSteps(i18n) {
  return [
    {
      element: '#parameter-panel',
      popover: {
        title: i18n.t('crossvalpage.settingtitle'),
        description: i18n.t('crossvalpage.settingdesc'),
        position: 'right'
      }
    },
    {
      element: '#uploadFiles',
      popover: {
        title: i18n.t('crossvalpage.uploadtitle'),
        description: i18n.t('crossvalpage.uploaddesc'),
        position: 'right'
      }
    },
    {
      element: '#crossvalBtn',
      popover: {
        title: i18n.t('crossvalpage.crossvaltitle'),
        description: i18n.t('crossvalpage.crossvaldesc'),
        position: 'right'
      }
    },
    {
      element: '#crossvalRes',
      popover: {
        title: i18n.t('crossvalpage.crossvalrestitle'),
        description: i18n.t('crossvalpage.crossvalresdesc'),
        position: 'right'
      }
    },{
      element: '#lastSetting',
      popover:{
        title: i18n.t('crossvalpage.lastSettingtitle'),
        description: i18n.t('crossvalpage.lastSettingdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#treeModel',
      popover:{
        title: i18n.t('crossvalpage.treemodeltitle'),
        description: i18n.t('crossvalpage.treemodeldesc'),
        position: 'top'
      }
    }
  ];
}
