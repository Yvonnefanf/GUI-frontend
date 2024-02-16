export default function getSteps(i18n) {
  return [
    {
      element: '#setting-gen-panel',
      popover: {
        title: i18n.t('gridsearchpage.settingtitle'),
        description: i18n.t('gridsearchpage.settingdesc'),
        position: 'right'
      }
    },
    {
      element: '#gridsearchBtn',
      popover: {
        title: i18n.t('gridsearchpage.gridsearchtitle'),
        description: i18n.t('gridsearchpage.gridsearchdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#gridsearchRes',
      popover: {
        title: i18n.t('gridsearchpage.gridsearchrestitle'),
        description: i18n.t('gridsearchpage.gridsearchresdesc'),
        position: 'left'
      }
    }
  ];
}
