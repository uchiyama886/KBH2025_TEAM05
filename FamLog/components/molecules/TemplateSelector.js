import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const templates = [
  { id: 1, label: '宿題終わった', description: '今日の宿題を全部終わらせた！', category: '宿題', emoji: '📚' },
  { id: 2, label: 'お風呂掃除', description: 'お風呂をピカピカに掃除しました', category: 'お手伝い', emoji: '🧹' },
  { id: 3, label: 'ランニング', description: '今日は〇〇分間走りました', category: '運動', emoji: '🏃' },
  { id: 4, label: '読書', description: '今日は本を読んだ', category: '読書', emoji: '📖' },
  { id: 5, label: '料理手伝い', description: '晩御飯の準備を手伝いました', category: 'お手伝い', emoji: '🍳' },
  { id: 6, label: '友達と遊んだ', description: '友達と楽しく遊びました', category: 'その他', emoji: '🤝' },
  // 必要なだけテンプレートを追加
];

const TemplateSelector = ({ onSelectTemplate }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>テンプレートから入力</Text>
      <View style={styles.buttonContainer}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.button}
            onPress={() => onSelectTemplate(template)}
            activeOpacity={0.7} // 押下時の透明度を調整してフィードバックを強化
          >
            <Text style={styles.buttonText}>{template.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // flexboxのgapプロパティを使用
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, // スタンプボタンと合わせて丸みを帯びたデザインに
    backgroundColor: '#e0e0e0',
    // 影を追加して少し浮いているように見せる
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500', // 少し太くして見やすく
  },
});

export default TemplateSelector;