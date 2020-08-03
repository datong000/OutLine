/**
 * 自定义描边材质球
 */
export class CtmMat_Outline extends Laya.BlinnPhongMaterial
{
    public static readonly Color: number = Laya.Shader3D.propertyNameToID( "u_Color" );
    public static readonly LineWidth: number = Laya.Shader3D.propertyNameToID( "u_LineWidth" );
    public static readonly Texture: number = Laya.Shader3D.propertyNameToID( "u_Texture" );

    public init(): void
    {
        this.setShaderName( "CtmSha_Outline" );
        this.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
    }

    public set Color( value: Laya.Vector4 )
    {
        this._shaderValues.setVector( CtmMat_Outline.Color, value );
    }

    public set LineWidth( value: number )
    {
        this._shaderValues.setNumber( CtmMat_Outline.LineWidth, value );
    }

    public set Texture( value: Laya.BaseTexture )
    {
        this._shaderValues.setTexture( CtmMat_Outline.Texture, value );
    }
}

export class CtmSha_Outline
{
    public initShader(): void
    {
        var attributeMap = {
            "a_Position": Laya.VertexMesh.MESH_POSITION0,
            "a_Normal": Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            'a_BoneWeights': Laya.VertexMesh.MESH_BLENDWEIGHT0,
            'a_BoneIndices': Laya.VertexMesh.MESH_BLENDINDICES0
        };
        var uniformMap = {
            'u_Bones': Laya.Shader3D.PERIOD_CUSTOM,
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_Color': Laya.Shader3D.PERIOD_MATERIAL,
            'u_LineWidth': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Texture': Laya.Shader3D.PERIOD_MATERIAL,

        };

        let vs1 = `
        #include "Lighting.glsl";
        attribute vec4 a_Position;
        attribute vec2 a_Texcoord0;
        attribute vec3 a_Normal;
        uniform mat4 u_MvpMatrix;
        uniform mat4 u_WorldMat;
        varying vec2 v_Texcoord0;
        varying vec3 v_Normal;

        #ifdef BONE
        attribute vec4 a_BoneIndices;
        attribute vec4 a_BoneWeights;
        const int c_MaxBoneCount = 24;
        uniform mat4 u_Bones[c_MaxBoneCount];
        #endif

        void main()
        {
            //计算顶点位置
            v_Texcoord0 = a_Texcoord0;
            #ifdef BONE
            mat4 skinTransform=mat4(0.0);
            skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
            skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
            skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
            skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
            vec4 position = skinTransform * a_Position;
            gl_Position=u_MvpMatrix * position;
            mat3 worldMat=mat3(u_WorldMat * skinTransform);
            #else
            gl_Position=u_MvpMatrix * a_Position;
            mat3 worldMat=mat3(u_WorldMat);
            #endif
            v_Normal=worldMat*a_Normal;
            gl_Position=remapGLPositionZ(gl_Position); 
        }
        `;
        let ps1 = `
        #ifdef FSHIGHPRECISION
        precision highp float;
        #else
        precision mediump float;
        #endif
        uniform vec4 u_Color;
        uniform sampler2D u_Texture;
        varying vec2 v_Texcoord0;

        void main()
        {
            //纹理取样
            // gl_FragColor = vec4(0.0,0.0,0.0,1.0); 
            gl_FragColor = texture2D(u_Texture,v_Texcoord0);
        }
        `;

        var customShader = Laya.Shader3D.add( "CtmSha_Outline" );
        var subShader = new Laya.SubShader( attributeMap, uniformMap, Laya.SkinnedMeshSprite3D.shaderDefines, Laya.BlinnPhongMaterial.shaderDefines );
        customShader.addSubShader( subShader );
        subShader.addShaderPass( vs1, ps1 );

        let vs2 = `
        #include \"Lighting.glsl\";
        attribute vec4 a_Position;
        attribute vec3 a_Normal;
        uniform float u_LineWidth;
        uniform mat4 u_MvpMatrix;
        uniform mat4 u_WorldMat;
        varying vec3 v_Normal;
        #ifdef BONE
        attribute vec4 a_BoneIndices;
        attribute vec4 a_BoneWeights;
        const int c_MaxBoneCount = 24;
        uniform mat4 u_Bones[c_MaxBoneCount];
        #endif
        void main()
        {
            #ifdef BONE
            mat4 skinTransform=mat4(0.0);
            skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
            skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
            skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
            skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
            vec4 newPosition = skinTransform * a_Position;
            mat3 worldMat=mat3(u_WorldMat * skinTransform);
            #else
            gl_Position=u_MvpMatrix * a_Position;
            mat3 worldMat=mat3(u_WorldMat);
            #endif
            v_Normal=worldMat*a_Normal;
            
            //顶点位置+法线*长度
            vec4 position = vec4(a_Position.xyz + a_Normal * u_LineWidth, 1.0); 
            #ifdef BONE
            gl_Position =  u_MvpMatrix * (skinTransform *  position); 
            #else
            gl_Position =  u_MvpMatrix *  position; 
            #endif
        }
        `;
        let ps2 = `
        #ifdef FSHIGHPRECISION
        precision highp float;
        #else
        precision mediump float;
        #endif
        uniform vec4 u_Color;
        void main()
        {
            //设置描边颜色
            gl_FragColor = u_Color; 
        }
        `;

        var pass1 = subShader.addShaderPass( vs2, ps2 );
        pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
    }
}