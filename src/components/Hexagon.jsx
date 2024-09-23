/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/hexagon.glb -o src/components/Hexagon.jsx -r public
*/

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Color } from 'three';
import { MathUtils, randFloat } from 'three/src/math/MathUtils.js';

const TIME_AFTER_HIT = 600;

export function Hexagon({ color, onHit, hit, ...props }) {
	const { nodes, materials } = useGLTF('/models/hexagon.glb', 'draco/gltf/');
	const hexagonMaterial = useRef();

	const [disabled, setDisabled] = useState(false);
	const randomColor = useMemo(() => {
		const newColor = new Color(color);
		newColor.multiplyScalar(randFloat(0.5, 1.2));
		return newColor;
	}, [color]);

	useFrame((_, delta) => {
		if (hit && !disabled) {
			hexagonMaterial.current.opacity = MathUtils.lerp(hexagonMaterial.current.opacity, 0, delta * 1.2);
		}
	});

	useEffect(() => {
		if (hit) {
			setTimeout(() => {
				setDisabled(true);
			}, TIME_AFTER_HIT);
		}
	}, [hit]);

	if (disabled) {
		return null;
	}

	return (
		<RigidBody
			{...props}
			type={'fixed'}
			name="hexagon"
			colliders="hull"
			onCollisionEnter={(e) => {
				if (e.other.rigidBodyObject.name === 'player') {
					onHit();
				}
			}}
		>
			<mesh geometry={nodes.Hexagon.geometry} material={materials.hexagon}>
				<meshStandardMaterial
					ref={hexagonMaterial}
					{...materials.hexagon}
					color={hit ? 'orange' : randomColor}
					transparent
				/>
			</mesh>
		</RigidBody>
	);
}

useGLTF.preload('/models/hexagon.glb', 'draco/gltf/');
