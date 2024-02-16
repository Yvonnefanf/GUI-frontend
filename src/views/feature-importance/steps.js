export default function getSteps(i18n) {
  return [
    {
      element: '#featureImportanceSetting',
      popover: {
        title: i18n.t('featurepage.settingtitle'),
        description: i18n.t('featurepage.settingdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#featureImportanceUpload',
      popover: {
        title: i18n.t('featurepage.uploadtitle'),
        description: i18n.t('featurepage.uploaddesc'),
        position: 'bottom'
      }
    },
    {
      element: '#featureImportance',
      popover: {
        title: i18n.t('featurepage.featureimportancetitle'),
        description: i18n.t('featurepage.featureimportancedesc'),
        position: 'bottom'
      }
    },
    {
      element: '#featureImportanceRes',
      popover: {
        title: i18n.t('featurepage.featureimportancerestitle'),
        description: i18n.t('featurepage.featureimportancerestitle'),
        position: 'top'
      }
    },


    {
      element: '#advSampleSetting',
      popover: {
        title: i18n.t('advpage.settingtitle'),
        description: i18n.t('advpage.settingdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#advSampleUpload',
      popover: {
        title: i18n.t('advpage.uploadtitle'),
        description: i18n.t('advpage.uploaddesc'),
        position: 'bottom'
      }
    },
    {
      element: '#advSample',
      popover: {
        title: i18n.t('advpage.advtitle'),
        description: i18n.t('advpage.advdesc'),
        position: 'bottom'
      }
    },
    {
      element: '#advSampleRes',
      popover: {
        title: i18n.t('advpage.advrestitle'),
        description: i18n.t('advpage.advresdesc'),
        position: 'bottom'
      }
    }
  ];
}
