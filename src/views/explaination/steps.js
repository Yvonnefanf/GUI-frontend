export default function getSteps(i18n) {
  return [
    {
      element: '#setting-panel',
      popover: {
        title: i18n.t('explainpage.settingtitle'),
        description: i18n.t('explainpage.settingdesc'),
        position: 'right'
      }
    },
    {
      element: '#uploadBtn',
      popover: {
        title: i18n.t('explainpage.uploadtitle'),
        description: i18n.t('explainpage.uploaddesc'),
        position: 'bottom'
      }
    },
    {
      element: '#explainBtn',
      popover: {
        title: i18n.t('explainpage.explaintitle'),
        description: i18n.t('explainpage.explaindesc'),
        position: 'right'
      }
    },
    {
      element: '#explainRes',
      popover: {
        title: i18n.t('explainpage.explainrestitle'),
        description: i18n.t('explainpage.explainresdesc'),
        position: 'left'
      }
    }
  ];
}
