import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Moon, Sun, Bell, BellOff, Eye, Key } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import ApiKeyInput from '../components/ui/ApiKeyInput';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';

const SettingsPage: React.FC = () => {
  const { theme, fontScale, notifications, setTheme, setFontScale, toggleNotifications } = useSettingsStore();
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleApiKeyUpdated = () => {
    // Reload the page to reinitialize the Gemini API
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-900">
      <Header />
      
      <main className="flex-1 mt-16 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-12 h-12 rounded-full bg-primary-900/30 flex items-center justify-center mr-4"
            >
              <Eye className="w-6 h-6 text-primary-500" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
              <p className="text-gray-400">Customize your Illuminati experience</p>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* API Key Settings (Admin Only) */}
            {user?.is_admin && (
              <motion.div 
                className="glass-effect rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Key className="text-primary-500" size={24} />
                  <h2 className="text-xl font-bold">API Configuration</h2>
                </div>
                <ApiKeyInput onKeyUpdated={handleApiKeyUpdated} />
              </motion.div>
            )}

            {/* Appearance Settings */}
            <motion.div 
              className="glass-effect rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-6">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Theme</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setTheme('dark')}
                      className={`rounded-lg p-4 ${theme === 'dark' 
                        ? 'bg-primary-900/30 border border-primary-500' 
                        : 'bg-dark-800 border border-dark-700'}`}
                    >
                      <Moon className={theme === 'dark' ? 'text-primary-500' : 'text-gray-400'} />
                      <span className="block mt-2 text-sm">Dark</span>
                    </button>
                    
                    <button
                      onClick={() => setTheme('light')}
                      className={`rounded-lg p-4 ${theme === 'light' 
                        ? 'bg-primary-900/30 border border-primary-500' 
                        : 'bg-dark-800 border border-dark-700'}`}
                    >
                      <Sun className={theme === 'light' ? 'text-primary-500' : 'text-gray-400'} />
                      <span className="block mt-2 text-sm">Light</span>
                    </button>
                    
                    <button
                      onClick={() => setTheme('cosmic')}
                      className={`rounded-lg p-4 ${theme === 'cosmic' 
                        ? 'bg-primary-900/30 border border-primary-500' 
                        : 'bg-dark-800 border border-dark-700'}`}
                    >
                      <Eye className={theme === 'cosmic' ? 'text-primary-500' : 'text-gray-400'} />
                      <span className="block mt-2 text-sm">Cosmic</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Font Scale</h3>
                  <input
                    type="range"
                    min="0.8"
                    max="1.4"
                    step="0.1"
                    value={fontScale}
                    onChange={(e) => setFontScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Notification Settings */}
            <motion.div 
              className="glass-effect rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold mb-6">Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Notifications</h3>
                    <p className="text-sm text-gray-400">Receive alerts for new messages</p>
                  </div>
                  <button 
                    onClick={toggleNotifications}
                    className={`p-2 rounded-lg ${notifications 
                      ? 'bg-primary-900/30 text-primary-500' 
                      : 'bg-dark-800 text-gray-400'}`}
                  >
                    {notifications ? <Bell /> : <BellOff />}
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Account Settings */}
            <motion.div 
              className="glass-effect rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Account</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Email</h3>
                  <p className="font-medium">{user?.email || 'Not signed in'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">User ID</h3>
                  <p className="font-medium">{user?.id || 'Not available'}</p>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                icon={<Save size={18} />}
                variant={saved ? "secondary" : "primary"}
              >
                {saved ? "Saved!" : "Save Settings"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;