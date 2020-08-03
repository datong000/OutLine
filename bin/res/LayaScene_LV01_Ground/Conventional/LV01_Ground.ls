{
	"version":"LAYASCENE3D:01",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"LV01_Ground",
			"ambientColor":[
				0.2050173,
				0.5653292,
				0.5808823
			],
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						31.19,
						41.27,
						31.29
					],
					"rotation":[
						-0.3310888,
						0.3572657,
						0.1371415,
						0.8625159
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":0,
					"orthographic":true,
					"orthographicVerticalSize":20,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.7205882,
						0.9306288,
						1,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Quad",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0.8633956,
						0,
						0.5045275
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Quad.lm",
					"enableRender":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Resources/unity_builtin_extra.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			}
		]
	}
}