export default function getSteps(i18n) {
  return [
    {
      element: '#parameter-panel',
      popover: {
        title: i18n.t('trainpage.settingtitle'),
        description: i18n.t('trainpage.settingdesc'),
        position: 'right'
      }
    },
    {
      element: '#uploadFIles',
      popover: {
        title: i18n.t('trainpage.uploadtitle'),
        description: i18n.t('trainpage.uploaddesc'),
        position: 'right'
      }
    },
    {
      element: '#trainBtn',
      popover: {
        title: i18n.t('trainpage.traintitle'),
        description: i18n.t('trainpage.traindesc'),
        position: 'right'
      }
    },
    {
      element: '#trainRes',
      popover: {
        title: i18n.t('trainpage.trainrestitle'),
        description: i18n.t('trainpage.trainresdesc'),
        position: 'right'
      }
    },{
      element: '#lastSetting',
      popover:{
        title: i18n.t('trainpage.lastSettingtitle'),
        description: i18n.t('trainpage.lastSettingdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#treeModel',
      popover:{
        title: i18n.t('trainpage.treemodeltitle'),
        description: i18n.t('trainpage.treemodeldesc'),
        position: 'top'
      }
    }
  ];
}
