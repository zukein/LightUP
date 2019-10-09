from sklearn.feature_extraction import DictVectorizer


#入力データを作成
train = [
    {"user": "1","item": "5", "age": 19},
    {"user": "2","item": "43", "age": 33},
    {"user": "3","item": "20", "age": 55},
    {"user": "4","item": "10", "age": 20}
]

train

#DictVectorizer()メソッドを使うことで、age以外をダミー変数へ変換 (ダミー変数とは0/1になおすこと)
v = DictVectorizer()
X = v.fit_transform(train)

print(X.toarray())

import numpy as np

#目的変数用のデータを作る
y = np.array([5.0, 1.0, 2.0, 4.0])

#機械学習で使用するアルゴリズムを準備する=>機械学習用のライブラリをインポートする
from fastFM import als

#ALS(アルゴリズムの名称)モデルを初期化する
fm = als.FMRegression(n_iter=1000, init_stdev=0.1, rank=2, l2_reg_w=0.1, l2_reg_V=0.5)

#学習用データセットをモデルの引数として、機械学習を行う
#説明変数はX,目的変数はy
#モデルの名称.fit(説明変数, 目的変数)
fm.fit(X, y)

# 未知のデータ(ユーザーID5番)を入力すると、どんな評価が予測されるか？

#使うモデル
fm
# メソッド（推論するから、predict())
#fm.predict("ここに未知のデータが入ります=説明変数")
#fm.predict({"user": 5, "item": "10", "age":24})

#説明変数をダミー変数に変換するので.... =>v.transform()
fm.predict(v.transform({"user": 5, "item": "10", "age":24}))

fm.predict(v.transform({"user": 6, "item": "10", "age":54}))