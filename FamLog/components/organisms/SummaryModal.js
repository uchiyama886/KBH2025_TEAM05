import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; // expo-speechをインポート
import { summarizeWithAI } from '../../api/openrouter';

const SummaryModal = ({ isVisible, onClose, chartData, mvp, categoryChartData, emojiChartData }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // 読み上げの状態を管理

  useEffect(() => {
    if (isVisible) {
      fetchSummary();
    }
  }, [isVisible]);
  
  // 要約が完了したら自動で読み上げを開始
  useEffect(() => {
    if (summary && !loading) {
      speak();
    }
  }, [summary, loading]);

  const generatePrompt = () => {
    let prompt = "あなたは家族の活動を伝えるニュースキャスターです。以下のデータを基に、ユーモアを交えながら日本の視聴者向けにニュースの形で日本語で要約してください。\n\n";
    
    prompt += "【今週の投稿数】\n";
    const contributionData = chartData.datasets[0].data.map((count, index) => `${chartData.labels[index]}曜日: ${count}件`).join('、');
    prompt += `今週は、${contributionData}の投稿がありました。`;

    if (mvp) {
      prompt += `\n\n【今週のMVP】\n今週のMVPは${mvp.name}さんです！${mvp.commits}件もの投稿で、見事今週のトップに輝きました。`;
    } else {
      prompt += `\n\n【今週のMVP】\n残念ながら、今週はまだ投稿がありません。`;
    }

    prompt += "\n\n【カテゴリー別投稿数】\n";
    const categoryData = categoryChartData.datasets[0].data.map((count, index) => `${categoryChartData.labels[index]}: ${count}件`).join('、');
    prompt += `投稿の内訳を見てみましょう。${categoryData}となっています。`;

    prompt += "\n\n【絵文字の使用頻度】\n";
    if (emojiChartData && emojiChartData.length > 0) {
      const emojiData = emojiChartData.map(item => `${item.name}が${item.population}回`).join('、');
      prompt += `そして、人気を集めた絵文字は、${emojiData}でした！`;
    } else {
      prompt += "今週は絵文字の投稿がありませんでした。";
    }

    prompt += "\n\nこれらのデータを基に、全体を一つのニュースレポートとしてまとめてください。";

    return prompt;
  };

  const fetchSummary = async () => {
    setLoading(true);
    const prompt = generatePrompt();
    const aiSummary = await summarizeWithAI(prompt);
    setSummary(aiSummary);
    setLoading(false);
  };
  
  // 音声読み上げを開始
  const speak = () => {
    Speech.speak(summary, { language: 'ja-JP' });
    setIsPlaying(true);
  };

  // 音声読み上げを停止
  const stopSpeaking = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speak();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={30} color="#FF8DA1" />
          </Pressable>
          <Text style={styles.modalTitle}>AIによる要約</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#FF8DA1" />
          ) : (
            <>
              <Text style={styles.summaryText}>{summary}</Text>
              <Pressable style={styles.playPauseButton} onPress={handlePlayPause}>
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="#fff" />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20, // ボタンのための余白を追加
  },
  playPauseButton: {
    backgroundColor: '#FF8DA1',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default SummaryModal;