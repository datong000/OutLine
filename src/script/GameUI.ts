import { ui } from "./../ui/layaMaxUI";
import { CtmSha_Outline, CtmMat_Outline } from "./CtmMat_Outline";
import { CustomMaterial } from "./CustomMaterial";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI
{
    private _material: CtmMat_Outline;
    private _baseMaterials: Array<CtmMat_Outline>;

    constructor()
    {
        super();

        new CtmSha_Outline().initShader();

        // // //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild( new Laya.Scene3D() ) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = ( scene.addChild( new Laya.Camera( 0, 0.1, 100 ) ) ) as Laya.Camera;
        camera.transform.translate( new Laya.Vector3( 0, 3.5, 4 ) );
        camera.transform.rotate( new Laya.Vector3( -30, 0, 0 ), true, false );

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild( new Laya.DirectionLight() ) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3( 0.6, 0.6, 0.6 );
        directionLight.transform.worldMatrix.setForward( new Laya.Vector3( 1, -1, 0 ) );

        var baseMaterials: Array<CtmMat_Outline>;
        //加载精灵
        Laya.Sprite3D.load( "res/threeDimen/skinModel/dude/dude.lh", Laya.Handler.create( this, function ( dude: Laya.Sprite3D ): void
        {
            scene.addChild( dude );

            //使用自定义材质
            var customMaterial1: CtmMat_Outline = new CtmMat_Outline();
            customMaterial1.init();
            customMaterial1.Color = new Laya.Vector4( 0, 0, 0, 1 );
            customMaterial1.LineWidth = 0;
            Laya.Texture2D.load( "res/threeDimen/skinModel/dude/Assets/dude/head.png", Laya.Handler.create( this, function ( tex: Laya.Texture2D ): void
            {
                customMaterial1.Texture = tex;
            } ) );

            var customMaterial2: CtmMat_Outline = new CtmMat_Outline();
            customMaterial2.init();
            customMaterial2.Color = new Laya.Vector4( 0, 0, 0, 1 );
            customMaterial2.LineWidth = 0;
            Laya.Texture2D.load( "res/threeDimen/skinModel/dude/Assets/dude/jacket.png", Laya.Handler.create( this, function ( tex: Laya.Texture2D ): void
            {
                customMaterial2.Texture = tex;
            } ) );

            var customMaterial3: CtmMat_Outline = new CtmMat_Outline();
            customMaterial3.init();
            customMaterial3.Color = new Laya.Vector4( 0, 0, 0, 1 );
            customMaterial3.LineWidth = 0;
            Laya.Texture2D.load( "res/threeDimen/skinModel/dude/Assets/dude/pants.png", Laya.Handler.create( this, function ( tex: Laya.Texture2D ): void
            {
                customMaterial3.Texture = tex;
            } ) );

            var customMaterial4: CtmMat_Outline = new CtmMat_Outline();
            customMaterial4.init();
            customMaterial4.Color = new Laya.Vector4( 0, 0, 0, 1 );
            customMaterial4.LineWidth = 0;
            Laya.Texture2D.load( "res/threeDimen/skinModel/dude/Assets/dude/upBodyC.png", Laya.Handler.create( this, function ( tex: Laya.Texture2D ): void
            {
                customMaterial4.Texture = tex;
            } ) );

            baseMaterials = new Array<CtmMat_Outline>();
            baseMaterials[ 0 ] = customMaterial1;
            baseMaterials[ 1 ] = customMaterial2;
            baseMaterials[ 2 ] = customMaterial3;
            baseMaterials[ 3 ] = customMaterial4;
            this._baseMaterials = baseMaterials;

            ( dude.getChildAt( 0 ).getChildAt( 0 ) as Laya.SkinnedMeshSprite3D ).skinnedMeshRenderer.sharedMaterials = baseMaterials;
            dude.transform.position = new Laya.Vector3( 0, 0, 0 );
            dude.transform.scale = new Laya.Vector3( 0.6, 0.6, 0.6 );
            dude.transform.rotate( new Laya.Vector3( 5, 180, 0 ), false, false );

            Laya.timer.frameLoop( 1, this, () =>
            {
                dude.transform.rotate( new Laya.Vector3( 0, 1, 0 ), false, false );
            } )
        } ) );

        //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild( new Laya.MeshSprite3D( Laya.PrimitiveMesh.createBox( 1, 1, 1 ) ) ) as Laya.MeshSprite3D;
        // box.transform.rotate( new Laya.Vector3( 0, 45, 0 ), false, false );

        var material: CtmMat_Outline = new CtmMat_Outline();
        // material.init();
        // material.Color = new Laya.Vector4( 0, 0, 0, 1 );
        // material.LineWidth = 0;
        // Laya.Texture2D.load( "res/layabox.png", Laya.Handler.create( null, function ( tex: Laya.Texture2D )
        // {
        //     material.Texture = tex;
        // } ) );
        // this._material = material;
        // box.meshRenderer.material = material;

        // let out: Laya.Quaternion = new Laya.Quaternion();
        // let yaw, pitch, roll;
        // yaw = pitch = roll = 0;

        // Laya.timer.frameLoop( 1, this, () =>
        // {
        //     yaw += 0.005;
        //     roll += 0.005;
        //     Laya.Quaternion.createFromYawPitchRoll( yaw, pitch, roll, out );
        //     box.transform.rotation = out;
        // } )


        this.slider.showLabel = false;
        this.slider.changeHandler = Laya.Handler.create( this, () =>
        {
            if ( baseMaterials != null )
            {
                for ( let i: number = 0; i < baseMaterials.length; i++ )
                {
                    baseMaterials[ i ].LineWidth = this.slider.value / 100;
                }
            }
            else
            {
                material.LineWidth = this.slider.value / 100;
            }
        }, null, false );

        this.colorPicker.changeHandler = new Laya.Handler( this, this.onChangeColor, [ this.colorPicker ] );

        this.bt.on( Laya.Event.CLICK, this, () =>
        {
            if ( baseMaterials != null )
            {
                this.slider.value = 100;
                for ( let i: number = 0; i < baseMaterials.length; i++ )
                {
                    baseMaterials[ i ].LineWidth = 1;
                }
            }
            else
            {
                material.LineWidth = 0.015;
                this.slider.value = 0.015 * 100;
            }
        } );
    }

    private onChangeColor( colorPicker: Laya.ColorPicker ): void
    {
        let arr = this.colorString2RGB( colorPicker.selectedColor ).split( "," );
        if ( this._baseMaterials != null )
        {
            for ( let i: number = 0; i < this._baseMaterials.length; i++ )
            {
                this._baseMaterials[ i ].Color = new Laya.Vector4( Number( arr[ 0 ] ) / 255, Number( arr[ 1 ] ) / 255, Number( arr[ 2 ] ) / 255, 1 );
            }
        }
        else
        {
            this._material.Color = new Laya.Vector4( Number( arr[ 0 ] ) / 255, Number( arr[ 1 ] ) / 255, Number( arr[ 2 ] ) / 255, 1 );
        }
    }

    /**
     * #ffffff转RGB颜色值
     */
    public colorString2RGB( value: string ): string
    {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = value.toLowerCase();
        if ( sColor && reg.test( sColor ) )
        {
            if ( sColor.length === 4 )
            {
                var sColorNew = "#";
                for ( var i = 1; i < 4; i += 1 )
                {
                    sColorNew += sColor.slice( i, i + 1 ).concat( sColor.slice( i, i + 1 ) );
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for ( var i = 1; i < 7; i += 2 )
            {
                sColorChange.push( parseInt( "0x" + sColor.slice( i, i + 2 ) ) );
            }
            return sColorChange.join( "," );
        }
        else
        {
            return sColor;
        }
    }
}
