/*
  seed.js
  -------
  This script populates the MongoDB database with all the
  initial data needed for the FixMyPhone application.

  It inserts:
  - 5 issue categories
  - All questions for each category
  - All possible causes with their fix steps
  - All scoring rules that link answers to causes

  To run this script:
  node data/seed.js

  WARNING: This script clears existing data before inserting
  fresh data. Do not run it on a live production database.
*/

const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

// Import all models
const Issue = require('../models/Issue')
const Question = require('../models/Question')
const Cause = require('../models/Cause')
const Rule = require('../models/Rule')

// ============================================================
// ISSUES DATA
// The five category cards shown on the Home page
// ============================================================

const issuesData = [
  {
    issueId: 'performance',
    label: 'Performance',
    description: 'Phone running slow or freezing',
    icon: '⚡'
  },
  {
    issueId: 'battery',
    label: 'Battery and Heat',
    description: 'Battery draining fast or overheating',
    icon: '🔋'
  },
  {
    issueId: 'apps',
    label: 'Apps',
    description: 'Apps crashing or not loading',
    icon: '📱'
  },
  {
    issueId: 'wifi',
    label: 'Wi-Fi and Bluetooth',
    description: 'Connection problems with Wi-Fi or Bluetooth',
    icon: '📶'
  },
  {
    issueId: 'signal',
    label: 'Mobile Signal',
    description: 'No service, weak signal or dropped calls',
    icon: '📡'
  }
]

// ============================================================
// QUESTIONS DATA
// All questions for each category
// ============================================================

const questionsData = [
  // ---- SIGNAL QUESTIONS ----
  {
    issueId: 'signal',
    questionId: 'q1',
    order: 1,
    text: 'What is the main problem you are experiencing?',
    options: [
      { id: 'a', text: 'No signal or no service' },
      { id: 'b', text: 'Weak signal or one bar' },
      { id: 'c', text: 'Signal drops in and out' },
      { id: 'd', text: 'Slow mobile data' }
    ]
  },
  {
    issueId: 'signal',
    questionId: 'q2',
    order: 2,
    text: 'Where does this problem happen?',
    options: [
      { id: 'a', text: 'Everywhere I go' },
      { id: 'b', text: 'Only in one specific location' },
      { id: 'c', text: 'Mostly indoors' },
      { id: 'd', text: 'Only in certain areas or towns' }
    ]
  },
  {
    issueId: 'signal',
    questionId: 'q3',
    order: 3,
    text: 'How long has this problem been happening?',
    options: [
      { id: 'a', text: 'Just started today' },
      { id: 'b', text: 'A few days' },
      { id: 'c', text: 'A week or more' },
      { id: 'd', text: 'Always been like this' }
    ]
  },
  {
    issueId: 'signal',
    questionId: 'q4',
    order: 4,
    text: 'Have you tried turning airplane mode on and off?',
    options: [
      {
        id: 'a',
        text: 'Yes and it fixed it',
        exits: true,
        fixDescription: 'Toggling airplane mode off and on reset your network connection and resolved the issue.'
      },
      { id: 'b', text: 'Yes but it made no difference' },
      { id: 'c', text: 'No I have not tried that yet' }
    ]
  },
  {
    issueId: 'signal',
    questionId: 'q5',
    order: 5,
    text: 'Does the problem affect calls, data or both?',
    options: [
      { id: 'a', text: 'Calls only' },
      { id: 'b', text: 'Mobile data only' },
      { id: 'c', text: 'Both calls and data' }
    ]
  },
  {
    issueId: 'signal',
    questionId: 'q6',
    order: 6,
    text: 'Have you recently changed SIM card or network provider?',
    options: [
      { id: 'a', text: 'Yes recently changed SIM' },
      { id: 'b', text: 'Yes recently changed provider' },
      { id: 'c', text: 'No changes made' }
    ]
  },

  // ---- PERFORMANCE QUESTIONS ----
  {
    issueId: 'performance',
    questionId: 'q1',
    order: 1,
    text: 'What performance issue are you experiencing?',
    options: [
      { id: 'a', text: 'Phone is very slow generally' },
      { id: 'b', text: 'Apps take a long time to open' },
      { id: 'c', text: 'Phone freezes or becomes unresponsive' },
      { id: 'd', text: 'Phone restarts on its own' }
    ]
  },
  {
    issueId: 'performance',
    questionId: 'q2',
    order: 2,
    text: 'How much storage is available on your phone?',
    options: [
      { id: 'a', text: 'Less than 1GB free' },
      { id: 'b', text: 'Between 1GB and 5GB free' },
      { id: 'c', text: 'More than 5GB free' },
      { id: 'd', text: 'I am not sure' }
    ]
  },
  {
    issueId: 'performance',
    questionId: 'q3',
    order: 3,
    text: 'When did the performance issues start?',
    options: [
      { id: 'a', text: 'After a software update' },
      { id: 'b', text: 'After installing a new app' },
      { id: 'c', text: 'Gradually over time' },
      { id: 'd', text: 'Suddenly with no obvious cause' }
    ]
  },
  {
    issueId: 'performance',
    questionId: 'q4',
    order: 4,
    text: 'Have you already tried restarting your phone?',
    options: [
      {
        id: 'a',
        text: 'Yes and it fixed it',
        exits: true,
        fixDescription: 'Restarting your phone cleared the issue. A regular restart helps keep your phone running smoothly.'
      },
      { id: 'b', text: 'Yes but it made no difference' },
      { id: 'c', text: 'No I have not restarted it' }
    ]
  },
  {
    issueId: 'performance',
    questionId: 'q5',
    order: 5,
    text: 'How old is your phone approximately?',
    options: [
      { id: 'a', text: 'Less than 1 year old' },
      { id: 'b', text: '1 to 3 years old' },
      { id: 'c', text: 'More than 3 years old' }
    ]
  },

  // ---- BATTERY QUESTIONS ----
  {
    issueId: 'battery',
    questionId: 'q1',
    order: 1,
    text: 'What is the main issue you are experiencing?',
    options: [
      { id: 'a', text: 'Battery drains very quickly' },
      { id: 'b', text: 'Phone gets very hot' },
      { id: 'c', text: 'Both battery drain and overheating' },
      { id: 'd', text: 'Battery does not charge properly' }
    ]
  },
  {
    issueId: 'battery',
    questionId: 'q2',
    order: 2,
    text: 'How long does your battery last on a full charge?',
    options: [
      { id: 'a', text: 'Less than 4 hours' },
      { id: 'b', text: 'Between 4 and 8 hours' },
      { id: 'c', text: 'More than 8 hours' }
    ]
  },
  {
    issueId: 'battery',
    questionId: 'q3',
    order: 3,
    text: 'When does your phone get hottest?',
    options: [
      { id: 'a', text: 'While charging' },
      { id: 'b', text: 'While using certain apps' },
      { id: 'c', text: 'Even when sitting idle' },
      { id: 'd', text: 'Phone does not get hot' }
    ]
  },
  {
    issueId: 'battery',
    questionId: 'q4',
    order: 4,
    text: 'Have you checked which apps are using the most battery?',
    options: [
      {
        id: 'a',
        text: 'Yes and uninstalled the problem app',
        exits: true,
        fixDescription: 'Removing the app that was draining your battery resolved the issue.'
      },
      { id: 'b', text: 'Yes found a problem app but kept it' },
      { id: 'c', text: 'Yes but nothing looked unusual' },
      { id: 'd', text: 'No I have not checked' }
    ]
  },
  {
    issueId: 'battery',
    questionId: 'q5',
    order: 5,
    text: 'How old is your battery or phone?',
    options: [
      { id: 'a', text: 'Less than 1 year old' },
      { id: 'b', text: '1 to 2 years old' },
      { id: 'c', text: 'More than 2 years old' }
    ]
  },

  // ---- APPS QUESTIONS ----
  {
    issueId: 'apps',
    questionId: 'q1',
    order: 1,
    text: 'What is happening with your apps?',
    options: [
      { id: 'a', text: 'One specific app keeps crashing' },
      { id: 'b', text: 'Multiple apps are crashing' },
      { id: 'c', text: 'Apps are very slow to load' },
      { id: 'd', text: 'Apps will not install or update' }
    ]
  },
  {
    issueId: 'apps',
    questionId: 'q2',
    order: 2,
    text: 'When did this problem start?',
    options: [
      { id: 'a', text: 'After a recent app update' },
      { id: 'b', text: 'After a phone software update' },
      { id: 'c', text: 'Gradually over time' },
      { id: 'd', text: 'Suddenly with no obvious reason' }
    ]
  },
  {
    issueId: 'apps',
    questionId: 'q3',
    order: 3,
    text: 'Have you tried clearing the app cache?',
    options: [
      {
        id: 'a',
        text: 'Yes and it fixed the problem',
        exits: true,
        fixDescription: 'Clearing the app cache removed corrupted temporary files and resolved the issue.'
      },
      { id: 'b', text: 'Yes but the problem came back' },
      { id: 'c', text: 'No I have not tried that' }
    ]
  },
  {
    issueId: 'apps',
    questionId: 'q4',
    order: 4,
    text: 'How much free storage does your phone have?',
    options: [
      { id: 'a', text: 'Less than 1GB free' },
      { id: 'b', text: 'Between 1GB and 5GB free' },
      { id: 'c', text: 'More than 5GB free' },
      { id: 'd', text: 'I am not sure' }
    ]
  },

  // ---- WIFI QUESTIONS ----
  {
    issueId: 'wifi',
    questionId: 'q1',
    order: 1,
    text: 'Which connection type is causing problems?',
    options: [
      { id: 'a', text: 'Wi-Fi only' },
      { id: 'b', text: 'Bluetooth only' },
      { id: 'c', text: 'Both Wi-Fi and Bluetooth' }
    ]
  },
  {
    issueId: 'wifi',
    questionId: 'q2',
    order: 2,
    text: 'What is the specific Wi-Fi or Bluetooth problem?',
    options: [
      { id: 'a', text: 'Cannot connect to the network' },
      { id: 'b', text: 'Connects but has no internet' },
      { id: 'c', text: 'Keeps disconnecting' },
      { id: 'd', text: 'Very slow speeds' }
    ]
  },
  {
    issueId: 'wifi',
    questionId: 'q3',
    order: 3,
    text: 'Does this happen on all networks or just one?',
    options: [
      { id: 'a', text: 'Only on my home network' },
      { id: 'b', text: 'On all networks I try' },
      { id: 'c', text: 'Only on certain networks' }
    ]
  },
  {
    issueId: 'wifi',
    questionId: 'q4',
    order: 4,
    text: 'Have you tried forgetting the network and reconnecting?',
    options: [
      {
        id: 'a',
        text: 'Yes and it fixed it',
        exits: true,
        fixDescription: 'Forgetting and reconnecting to the network cleared the saved connection settings and resolved the issue.'
      },
      { id: 'b', text: 'Yes but the problem came back' },
      { id: 'c', text: 'No I have not tried that' }
    ]
  },
  {
    issueId: 'wifi',
    questionId: 'q5',
    order: 5,
    text: 'Have you restarted your router recently?',
    options: [
      {
        id: 'a',
        text: 'Yes and it helped',
        exits: true,
        fixDescription: 'Restarting the router refreshed the network connection and resolved the issue.'
      },
      { id: 'b', text: 'Yes but no difference' },
      { id: 'c', text: 'No I have not restarted it' }
    ]
  }
]

// ============================================================
// CAUSES DATA
// All possible causes and their fix steps
// ============================================================

const causesData = [
  {
    causeId: 'network-outage',
    title: 'Possible network outage in your area',
    description: 'Your signal loss appears to be related to a network issue in your area rather than your device.',
    fixSteps: [
      { step: 1, title: 'Check your network provider status page', detail: 'Visit your network provider\'s website or app and look for any reported outages in your area.' },
      { step: 2, title: 'Toggle airplane mode on and off', detail: 'Swipe down from the top of your screen, turn on airplane mode for 30 seconds, then turn it off again. This forces your phone to reconnect to the network.' },
      { step: 3, title: 'Restart your phone', detail: 'A full restart can clear network faults. Hold the power button and select restart.' },
      { step: 4, title: 'Move to a different location', detail: 'If possible, move to a different area. If signal returns elsewhere, the issue is likely localised to that area.' }
    ]
  },
  {
    causeId: 'sim-issue',
    title: 'SIM card or account issue',
    description: 'Your issue may be related to your SIM card not being read correctly or an account problem with your provider.',
    fixSteps: [
      { step: 1, title: 'Remove and reinsert your SIM card', detail: 'Power off your phone, carefully remove the SIM card, wait 10 seconds, reinsert it and power back on.' },
      { step: 2, title: 'Check your account is active', detail: 'Log into your provider\'s app or website to confirm your account is active and your plan has not expired.' },
      { step: 3, title: 'Test your SIM in another phone', detail: 'If possible, put your SIM into another phone to check if the problem follows the SIM or stays with your device.' },
      { step: 4, title: 'Contact your network provider', detail: 'If none of the above work, contact your provider directly. They can check if your SIM needs to be replaced or if there is an account issue.' }
    ]
  },
  {
    causeId: 'weak-coverage',
    title: 'Weak signal coverage in your area',
    description: 'Your location may have limited mobile coverage. This can be caused by distance from a mast, building materials or geography.',
    fixSteps: [
      { step: 1, title: 'Move to a window or go outside', detail: 'Building materials like concrete and metal block signals. Moving closer to a window or stepping outside can improve signal strength significantly.' },
      { step: 2, title: 'Check your network mode settings', detail: 'Go to Settings → Mobile Network → Network Mode. Try switching between 4G and 3G to see if one gives a stronger signal in your area.' },
      { step: 3, title: 'Check coverage for your area online', detail: 'Visit your network provider\'s coverage checker and enter your location to see what level of coverage is expected in your area.' },
      { step: 4, title: 'Consider Wi-Fi calling', detail: 'If you are in a known weak area, enabling Wi-Fi calling allows calls and texts over your Wi-Fi connection instead of the mobile network.' }
    ]
  },
  {
    causeId: 'data-congestion',
    title: 'Mobile data congestion or speed issue',
    description: 'Your mobile data may be slow due to network congestion, data limits or APN settings on your device.',
    fixSteps: [
      { step: 1, title: 'Check your data allowance', detail: 'Log into your provider\'s app and check if you have used up your monthly data allowance. Some providers reduce speed after a certain limit.' },
      { step: 2, title: 'Toggle airplane mode on and off', detail: 'This forces your phone to reconnect to the network and can refresh your data connection.' },
      { step: 3, title: 'Check your APN settings', detail: 'Go to Settings → Mobile Network → Access Point Names. Make sure the APN settings match your provider\'s recommended settings.' },
      { step: 4, title: 'Try a different location', detail: 'Network congestion is more common in busy areas. If you are in a crowded location, moving slightly can sometimes give a better connection.' }
    ]
  },
  {
    causeId: 'network-interference',
    title: 'Network interference causing signal drops',
    description: 'Your signal may be dropping due to interference from nearby objects or because your phone is switching between network masts.',
    fixSteps: [
      { step: 1, title: 'Toggle airplane mode on and off', detail: 'This forces your phone to reconnect to the nearest strongest mast and can stop it switching between masts repeatedly.' },
      { step: 2, title: 'Manually select your network', detail: 'Go to Settings → Mobile Network → Network Operators → Search manually. Select your provider from the list.' },
      { step: 3, title: 'Restart your phone', detail: 'A restart can clear the network connection cache and help your phone find a stable connection.' }
    ]
  },
  {
    causeId: 'low-storage',
    title: 'Low storage causing performance issues',
    description: 'Your phone needs free storage space to run smoothly. When storage is nearly full, performance can drop significantly.',
    fixSteps: [
      { step: 1, title: 'Check your available storage', detail: 'Go to Settings → Storage to see how much space is used and available.' },
      { step: 2, title: 'Delete unused apps', detail: 'Go through your apps and uninstall any you no longer use. Even freeing up 1-2GB can make a noticeable difference.' },
      { step: 3, title: 'Clear app caches', detail: 'Go to Settings → Apps, select each large app and tap Clear Cache. This removes temporary files without deleting your data.' },
      { step: 4, title: 'Move photos and videos to cloud storage', detail: 'Use Google Photos or iCloud to back up and remove media from your device. Photos and videos are usually the biggest use of storage.' }
    ]
  },
  {
    causeId: 'too-many-background-apps',
    title: 'Too many apps running in the background',
    description: 'Apps running in the background use memory and processing power which can slow your phone down noticeably.',
    fixSteps: [
      { step: 1, title: 'Close all background apps', detail: 'Press the recent apps button and swipe away all open apps. This frees up RAM immediately.' },
      { step: 2, title: 'Restrict background activity for apps', detail: 'Go to Settings → Apps → select an app → Battery → Restrict background activity.' },
      { step: 3, title: 'Restart your phone', detail: 'A restart closes all background processes and gives your phone a fresh start.' }
    ]
  },
  {
    causeId: 'software-fault',
    title: 'Software or update causing performance issues',
    description: 'A recent software update or app installation may have introduced a conflict or bug that is affecting performance.',
    fixSteps: [
      { step: 1, title: 'Restart your phone', detail: 'A restart can clear temporary software faults. Hold the power button and select restart.' },
      { step: 2, title: 'Check for further software updates', detail: 'Go to Settings → Software Update. Sometimes a follow-up patch is released to fix issues introduced by a previous update.' },
      { step: 3, title: 'Identify the problem app', detail: 'If the issue started after installing a specific app, try uninstalling it to see if performance improves.' },
      { step: 4, title: 'Clear the system cache partition', detail: 'On Android, this can be done through recovery mode. Search for the specific steps for your phone model. This does not delete your data.' }
    ]
  },
  {
    causeId: 'old-hardware',
    title: 'Ageing hardware limitations',
    description: 'Older phones may struggle with newer apps and software updates as the hardware becomes less capable of keeping up with demands.',
    fixSteps: [
      { step: 1, title: 'Reduce animations and visual effects', detail: 'Go to Settings → Developer Options → Window animation scale and set it to 0.5x. This makes the phone feel noticeably faster.' },
      { step: 2, title: 'Use lite versions of apps where available', detail: 'Many popular apps have lite versions that use less memory and processing power.' },
      { step: 3, title: 'Perform a factory reset as a last resort', detail: 'A factory reset removes all data and restores the phone to its original state. Back up everything first.' }
    ]
  },
  {
    causeId: 'battery-draining-app',
    title: 'An app is draining your battery',
    description: 'One or more apps are using excessive battery in the background causing your battery to drain faster than expected.',
    fixSteps: [
      { step: 1, title: 'Check battery usage by app', detail: 'Go to Settings → Battery → Battery Usage. Look for any app using an unusually high percentage of battery.' },
      { step: 2, title: 'Restrict background activity for the problem app', detail: 'Go to Settings → Apps → select the app → Battery → Restrict background activity.' },
      { step: 3, title: 'Uninstall the app if not needed', detail: 'If the problem app is not essential, uninstalling it is the most effective fix.' },
      { step: 4, title: 'Check for an app update', detail: 'Sometimes battery drain is caused by a bug in a specific version of an app. Updating it may resolve the issue.' }
    ]
  },
  {
    causeId: 'overheating-app',
    title: 'An app is causing your phone to overheat',
    description: 'Certain apps particularly games or streaming apps can cause your processor to work very hard leading to overheating.',
    fixSteps: [
      { step: 1, title: 'Close the app and let your phone cool down', detail: 'Remove the case if you have one and place the phone on a flat cool surface for 10 minutes.' },
      { step: 2, title: 'Check which app is causing the heat', detail: 'Go to Settings → Battery → Battery Usage and look for apps using a high percentage.' },
      { step: 3, title: 'Reduce screen brightness and close background apps', detail: 'High brightness combined with multiple background apps puts extra load on the processor and battery.' },
      { step: 4, title: 'Check for app updates', detail: 'An app update may include optimisations that reduce processor usage.' }
    ]
  },
  {
    causeId: 'faulty-charger',
    title: 'Faulty charger or charging port issue',
    description: 'Your charging problem may be caused by a damaged cable, faulty charger or debris in the charging port.',
    fixSteps: [
      { step: 1, title: 'Try a different charging cable and adapter', detail: 'Test with a different cable and charger to rule out a faulty accessory.' },
      { step: 2, title: 'Clean the charging port', detail: 'Use a soft dry toothbrush or compressed air to gently clean any dust or debris from the charging port.' },
      { step: 3, title: 'Try wireless charging if supported', detail: 'If your phone supports wireless charging, try this to determine if the charging port itself is the problem.' },
      { step: 4, title: 'Visit a repair centre', detail: 'If none of the above work, the charging port may need professional repair or replacement.' }
    ]
  },
  {
    causeId: 'old-battery',
    title: 'Battery degradation over time',
    description: 'Phone batteries degrade with use and age. After 2 years a battery may only hold 80 percent of its original charge capacity.',
    fixSteps: [
      { step: 1, title: 'Check your battery health', detail: 'On iPhone go to Settings → Battery → Battery Health. On Android check Settings → Battery.' },
      { step: 2, title: 'Enable battery saver mode', detail: 'Go to Settings → Battery → Battery Saver. This limits background activity and reduces power consumption.' },
      { step: 3, title: 'Reduce screen brightness and timeout', detail: 'The screen is the biggest drain on most phones. Reduce brightness and set the screen to turn off after 30 seconds.' },
      { step: 4, title: 'Consider a battery replacement', detail: 'If battery health is below 80 percent, a battery replacement is the most effective long-term solution.' }
    ]
  },
  {
    causeId: 'corrupted-app-data',
    title: 'Corrupted app data or cache',
    description: 'The app may have corrupted temporary files or data that is causing it to crash or behave unexpectedly.',
    fixSteps: [
      { step: 1, title: 'Clear the app cache', detail: 'Go to Settings → Apps → select the app → Storage → Clear Cache.' },
      { step: 2, title: 'Clear the app data if cache clear did not work', detail: 'Go to Settings → Apps → select the app → Storage → Clear Data. Warning: this will reset the app to its default state.' },
      { step: 3, title: 'Uninstall and reinstall the app', detail: 'Uninstalling and reinstalling gives the app a completely fresh installation which usually resolves persistent crashing issues.' },
      { step: 4, title: 'Check for an app update', detail: 'Open the Play Store or App Store and check if there is an update available for the app.' }
    ]
  },
  {
    causeId: 'software-conflict',
    title: 'Software conflict after a system update',
    description: 'A recent system update may have caused a conflict with one or more of your apps leading to crashes or slow performance.',
    fixSteps: [
      { step: 1, title: 'Restart your phone', detail: 'A restart after an update allows the system to complete any background processes and can resolve minor conflicts.' },
      { step: 2, title: 'Update all your apps', detail: 'Open the Play Store or App Store and update all apps. Developers often release updates after a major OS update to fix compatibility issues.' },
      { step: 3, title: 'Clear cache for affected apps', detail: 'Go to Settings → Apps → select the app → Storage → Clear Cache.' },
      { step: 4, title: 'Check for a follow-up system update', detail: 'Go to Settings → Software Update. A follow-up patch may already be available to fix the issue.' }
    ]
  },
  {
    causeId: 'router-issue',
    title: 'Router or home network issue',
    description: 'The problem appears to be with your router or home network rather than your phone itself.',
    fixSteps: [
      { step: 1, title: 'Restart your router', detail: 'Unplug your router from the power socket, wait 30 seconds and plug it back in. Wait 2 minutes for it to fully restart before testing.' },
      { step: 2, title: 'Move closer to the router', detail: 'Wi-Fi signal weakens with distance and through walls. Test the connection when standing close to the router.' },
      { step: 3, title: 'Check if other devices have the same problem', detail: 'If other devices also have no internet it confirms the issue is with the router rather than your phone.' },
      { step: 4, title: 'Contact your broadband provider', detail: 'If restarting the router does not resolve the issue your broadband provider may have a line fault or outage in your area.' }
    ]
  },
  {
    causeId: 'saved-network-fault',
    title: 'Saved network settings causing connection issues',
    description: 'Your phone may have saved incorrect or outdated network settings for this Wi-Fi network which is preventing a proper connection.',
    fixSteps: [
      { step: 1, title: 'Forget the network and reconnect', detail: 'Go to Settings → Wi-Fi, press and hold the network name, select Forget. Then reconnect by selecting the network and entering the password again.' },
      { step: 2, title: 'Reset network settings', detail: 'Go to Settings → General Management → Reset → Reset Network Settings. This clears all saved Wi-Fi passwords and Bluetooth pairings.' },
      { step: 3, title: 'Check the Wi-Fi password is correct', detail: 'Confirm you are using the correct password for the network. The password is usually on a label on the back of the router.' }
    ]
  },
  {
    causeId: 'bluetooth-interference',
    title: 'Bluetooth interference affecting connectivity',
    description: 'Bluetooth and Wi-Fi both use a specific frequency band and can interfere with each other causing connectivity problems.',
    fixSteps: [
      { step: 1, title: 'Turn Bluetooth off and test Wi-Fi', detail: 'Go to Settings → Bluetooth and toggle it off. Check if your Wi-Fi connection improves.' },
      { step: 2, title: 'Switch your router to the 5GHz band', detail: 'If your router supports dual band, connect to the 5GHz network instead of 2.4GHz. The 5GHz band does not interfere with Bluetooth.' },
      { step: 3, title: 'Move Bluetooth devices away from your router', detail: 'Keep Bluetooth speakers, headphones and other devices away from your router to reduce interference.' }
    ]
  }
]

// ============================================================
// RULES DATA
// Links answers to causes with a score
// ============================================================

const rulesData = [
  // ---- SIGNAL RULES ----
  { issueId: 'signal', questionId: 'q1', answerId: 'a', causeId: 'network-outage', score: 3 },
  { issueId: 'signal', questionId: 'q1', answerId: 'a', causeId: 'sim-issue', score: 2 },
  { issueId: 'signal', questionId: 'q1', answerId: 'b', causeId: 'weak-coverage', score: 3 },
  { issueId: 'signal', questionId: 'q1', answerId: 'c', causeId: 'network-interference', score: 3 },
  { issueId: 'signal', questionId: 'q1', answerId: 'd', causeId: 'data-congestion', score: 3 },
  { issueId: 'signal', questionId: 'q2', answerId: 'a', causeId: 'network-outage', score: 3 },
  { issueId: 'signal', questionId: 'q2', answerId: 'a', causeId: 'sim-issue', score: 2 },
  { issueId: 'signal', questionId: 'q2', answerId: 'b', causeId: 'weak-coverage', score: 3 },
  { issueId: 'signal', questionId: 'q2', answerId: 'c', causeId: 'weak-coverage', score: 2 },
  { issueId: 'signal', questionId: 'q2', answerId: 'd', causeId: 'weak-coverage', score: 2 },
  { issueId: 'signal', questionId: 'q3', answerId: 'a', causeId: 'network-outage', score: 3 },
  { issueId: 'signal', questionId: 'q3', answerId: 'b', causeId: 'network-outage', score: 2 },
  { issueId: 'signal', questionId: 'q3', answerId: 'd', causeId: 'weak-coverage', score: 2 },
  { issueId: 'signal', questionId: 'q5', answerId: 'c', causeId: 'network-outage', score: 2 },
  { issueId: 'signal', questionId: 'q6', answerId: 'a', causeId: 'sim-issue', score: 3 },
  { issueId: 'signal', questionId: 'q6', answerId: 'b', causeId: 'sim-issue', score: 3 },

  // ---- PERFORMANCE RULES ----
  { issueId: 'performance', questionId: 'q1', answerId: 'a', causeId: 'low-storage', score: 2 },
  { issueId: 'performance', questionId: 'q1', answerId: 'a', causeId: 'too-many-background-apps', score: 2 },
  { issueId: 'performance', questionId: 'q1', answerId: 'b', causeId: 'low-storage', score: 3 },
  { issueId: 'performance', questionId: 'q1', answerId: 'c', causeId: 'too-many-background-apps', score: 3 },
  { issueId: 'performance', questionId: 'q1', answerId: 'd', causeId: 'software-fault', score: 3 },
  { issueId: 'performance', questionId: 'q2', answerId: 'a', causeId: 'low-storage', score: 4 },
  { issueId: 'performance', questionId: 'q2', answerId: 'b', causeId: 'low-storage', score: 2 },
  { issueId: 'performance', questionId: 'q3', answerId: 'a', causeId: 'software-fault', score: 3 },
  { issueId: 'performance', questionId: 'q3', answerId: 'b', causeId: 'software-fault', score: 3 },
  { issueId: 'performance', questionId: 'q3', answerId: 'c', causeId: 'too-many-background-apps', score: 2 },
  { issueId: 'performance', questionId: 'q3', answerId: 'c', causeId: 'low-storage', score: 2 },
  { issueId: 'performance', questionId: 'q4', answerId: 'c', causeId: 'old-hardware', score: 3 },

  // ---- BATTERY RULES ----
  { issueId: 'battery', questionId: 'q1', answerId: 'a', causeId: 'battery-draining-app', score: 3 },
  { issueId: 'battery', questionId: 'q1', answerId: 'b', causeId: 'overheating-app', score: 3 },
  { issueId: 'battery', questionId: 'q1', answerId: 'c', causeId: 'battery-draining-app', score: 2 },
  { issueId: 'battery', questionId: 'q1', answerId: 'c', causeId: 'overheating-app', score: 2 },
  { issueId: 'battery', questionId: 'q1', answerId: 'd', causeId: 'faulty-charger', score: 4 },
  { issueId: 'battery', questionId: 'q2', answerId: 'a', causeId: 'battery-draining-app', score: 3 },
  { issueId: 'battery', questionId: 'q2', answerId: 'a', causeId: 'old-battery', score: 2 },
  { issueId: 'battery', questionId: 'q3', answerId: 'a', causeId: 'faulty-charger', score: 3 },
  { issueId: 'battery', questionId: 'q3', answerId: 'b', causeId: 'overheating-app', score: 3 },
  { issueId: 'battery', questionId: 'q3', answerId: 'c', causeId: 'battery-draining-app', score: 2 },
  { issueId: 'battery', questionId: 'q4', answerId: 'b', causeId: 'battery-draining-app', score: 3 },
  { issueId: 'battery', questionId: 'q5', answerId: 'c', causeId: 'old-battery', score: 4 },

  // ---- APPS RULES ----
  { issueId: 'apps', questionId: 'q1', answerId: 'a', causeId: 'corrupted-app-data', score: 3 },
  { issueId: 'apps', questionId: 'q1', answerId: 'b', causeId: 'low-storage', score: 3 },
  { issueId: 'apps', questionId: 'q1', answerId: 'c', causeId: 'low-storage', score: 3 },
  { issueId: 'apps', questionId: 'q1', answerId: 'd', causeId: 'low-storage', score: 3 },
  { issueId: 'apps', questionId: 'q2', answerId: 'a', causeId: 'corrupted-app-data', score: 3 },
  { issueId: 'apps', questionId: 'q2', answerId: 'b', causeId: 'software-conflict', score: 3 },
  { issueId: 'apps', questionId: 'q3', answerId: 'b', causeId: 'corrupted-app-data', score: 3 },
  { issueId: 'apps', questionId: 'q4', answerId: 'a', causeId: 'low-storage', score: 4 },

  // ---- WIFI RULES ----
  { issueId: 'wifi', questionId: 'q1', answerId: 'a', causeId: 'router-issue', score: 2 },
  { issueId: 'wifi', questionId: 'q1', answerId: 'a', causeId: 'saved-network-fault', score: 2 },
  { issueId: 'wifi', questionId: 'q1', answerId: 'b', causeId: 'bluetooth-interference', score: 3 },
  { issueId: 'wifi', questionId: 'q1', answerId: 'c', causeId: 'router-issue', score: 3 },
  { issueId: 'wifi', questionId: 'q2', answerId: 'a', causeId: 'saved-network-fault', score: 3 },
  { issueId: 'wifi', questionId: 'q2', answerId: 'b', causeId: 'router-issue', score: 3 },
  { issueId: 'wifi', questionId: 'q2', answerId: 'c', causeId: 'router-issue', score: 2 },
  { issueId: 'wifi', questionId: 'q2', answerId: 'c', causeId: 'bluetooth-interference', score: 2 },
  { issueId: 'wifi', questionId: 'q3', answerId: 'a', causeId: 'router-issue', score: 3 },
  { issueId: 'wifi', questionId: 'q3', answerId: 'b', causeId: 'saved-network-fault', score: 2 },
  { issueId: 'wifi', questionId: 'q4', answerId: 'b', causeId: 'saved-network-fault', score: 3 },
  { issueId: 'wifi', questionId: 'q5', answerId: 'b', causeId: 'router-issue', score: 3 }
]

// ============================================================
// SEED FUNCTION
// Clears existing data and inserts fresh data
// ============================================================

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    // Clear all existing data from each collection
    console.log('Clearing existing data...')
    await Issue.deleteMany({})
    await Question.deleteMany({})
    await Cause.deleteMany({})
    await Rule.deleteMany({})

    // Insert all new data
    console.log('Inserting issues...')
    await Issue.insertMany(issuesData)

    console.log('Inserting questions...')
    await Question.insertMany(questionsData)

    console.log('Inserting causes...')
    await Cause.insertMany(causesData)

    console.log('Inserting rules...')
    await Rule.insertMany(rulesData)

    console.log('Database seeded successfully')

    // Close the connection when done
    mongoose.connection.close()

  } catch (error) {
    console.log('Seed error:', error)
    mongoose.connection.close()
  }
}

// Run the seed function
seedDatabase()