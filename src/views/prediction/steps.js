export default function getSteps(i18n) {
  return [
    {
      element: '#parameter-panel',
      popover: {
        title: i18n.t('predpage.settingtitle'),
        description: i18n.t('predpage.settingdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#predRes',
      popover: {
        title: i18n.t('predpage.predrestitle'),
        description: i18n.t('predpage.predresdesc'),
        position: 'top'
      }
    }
  ];
}
